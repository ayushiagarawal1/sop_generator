from flask import Flask, render_template, request, jsonify
import openai
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pymongo import MongoClient

open_ai_key = os.environ.get("OPENAI_KEY")
db_url = os.environ.get("DB_KEY")
email_from = os.environ.get("FROM_EMAIL")
email_from_pass = os.environ.get("FROM_EMAIL_PASS")
app = Flask(__name__)

client = MongoClient(db_url)  # Replace with your MongoDB connection string
db = client["sop_data"]  
collection = db["user_data"] 

@app.route("/store-data", methods=["POST"])
def store_data():
    if request.method == "POST":
        user_inputs = request.json

        name = user_inputs.get("name")
        email = user_inputs.get("email")
        age = user_inputs.get("age")
        program = user_inputs.get("program")
        past_institute = user_inputs.get("past_institute")
        work_experience = user_inputs.get("work_experience")
        institute = user_inputs.get("institute")
        country = user_inputs.get("country")
        admitted_program = user_inputs.get("admitted_program")
        future_goals = user_inputs.get("future_goals")
        listening_score = user_inputs.get("listening_score")
        speaking_score = user_inputs.get("speaking_score")
        reading_score = user_inputs.get("reading_score")
        writing_score = user_inputs.get("writing_score")
        paid_fees = user_inputs.get("paid_fees")
        paid_gic = user_inputs.get("paid_gic")
        education = user_inputs.get("education")
        selectedEducation = user_inputs.get("selectedEducation")
        selectedTutionFee = user_inputs.get("selectedTutionFee")
        selectedGicFee = user_inputs.get("selectedGicFee")

        # Create a document to insert into MongoDB
        user_data = {
            "name": name,
            "email": email,
            "age": age,
            "program": program,
            "past_institute": past_institute,
            "work_experience": work_experience,
            "institute": institute,
            "country": country,
            "admitted_program": admitted_program,
            "future_goals": future_goals,
            "listening_score": listening_score,
            "speaking_score": speaking_score,
            "reading_score": reading_score,
            "writing_score": writing_score,
            "paid_fees": paid_fees,
            "paid_gic": paid_gic,
            "education": education,
            "selectedEducation": selectedEducation,
            "selectedTutionFee": selectedTutionFee,
            "selectedGicFee": selectedGicFee
        }

        # Insert the document into the MongoDB collection
        result = collection.insert_one(user_data)

        # Check if the insertion was successful
        if result.inserted_id:
            return "Data stored successfully"
        else:
            return "Failed to store data"




# Configure OpenAI API
openai.api_key = open_ai_key


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate-sop", methods=["POST"])
def generate_sop():
    user_inputs = request.json

    # Generate statement of purpose
    prompt = f"I am applying for Student Visa in Canada. I have provided you with the details now generate me a statement of purpose. Deatils are: \n Dear Admissions Committee,\nI am writing this statement of purpose to express my interest in {user_inputs['admitted_program']}...\n{user_inputs['name']} {user_inputs['age']}...\n i completed my highest level of education {user_inputs['selectedEducation']} from {user_inputs['past_institute']} and i studied {user_inputs['program']} there. And i am from {user_inputs['country']} country. \n My future goals are: {user_inputs['future_goals']} \n  I have work experience of {user_inputs['work_experience']} \n Now i want to pursue higher level of education from Canada and i have been admitted to {user_inputs['institute']} in program- {user_inputs['admitted_program']} and the status of my paid tution fee for first year is {user_inputs['selectedTuitionFee']} and i have already paid {user_inputs['paid_fees']}\n The status of my gic is {user_inputs['selectedGicFee']} and i have paid amount of {user_inputs['paid_gic']} \n My proficiency in english is shown by my scores. I scored {user_inputs['listening_score']} in English-listening, {user_inputs['reading_score']} in English Reading, {user_inputs['writing_score']} in English Writing and {user_inputs['speaking_score']} in English speaking\n \n I want you to follow a general template for statement of purpose. Make my skills show and try to gain a acceptable response from the visa officer. Give me this template in different sections- 1. From and To section From must include the name, sample address, city, state, zip code and email. Whereas To contains To, Visa Officer, High Commission of Canada, City, State, Zip code \n 2. Subject-statement of purpose for studying in canada \n 3. Introduction 4.Why the Program of Study in Canada at the Education Institute Name \n 5.Why Study in Canada: \n 6.My Future Goals: \n 7.Academic Background and Language Proficiency: \n 8. Finances: include the point of my paid fees already and gic \n 9. Conclusion: \n 10. Greetings with name {user_inputs['name']}. \n Give every paragraph in minimum 300 words."
    generated_sop = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1800  # Adjust as needed
    ).choices[0].text.strip()

    # Send email
    from_email = email_from
    from_password = email_from_pass
    to_email = user_inputs["email"]

    subject = "Statement of Purpose"
    message = MIMEMultipart()
    message['From'] = from_email
    message['To'] = to_email
    message['Subject'] = subject
    message.attach(MIMEText(generated_sop, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(from_email, from_password)
    server.sendmail(from_email, to_email, message.as_string())
    server.quit()

    return jsonify({"message": "Statement of Purpose generated and emailed."})


if __name__ == "__main__":
    app.run(debug=True)
