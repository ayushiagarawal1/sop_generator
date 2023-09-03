document
  .getElementById("sop-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const program = document.getElementById("program").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const past_institute = document.getElementById("past_institute").value;
    const work_experience = document.getElementById("work_experience").value;
    const institute = document.getElementById("institute").value;
    const admitted_program = document.getElementById("admitted_program").value;
    const country = document.getElementById("country").value;
    const future_goals = document.getElementById("future_goals").value;
    const listening_score = document.getElementById("listening_score").value;
    const reading_score = document.getElementById("reading_score").value;
    const speaking_score = document.getElementById("speaking_score").value;
    const writing_score = document.getElementById("writing_score").value;
    const paid_fees = document.getElementById("paid_fees").value;
    const paid_gic = document.getElementById("paid_gic").value;
    const education = document.getElementById("education").value;

    const educationSelect = document.querySelector("select");
    const selectedEducation = educationSelect.value;

    const tuitionFeeRadioButtons = document.querySelectorAll(
      'input[name="tution_fee"]'
    );
    let selectedTuitionFee = "";
    tuitionFeeRadioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        selectedTuitionFee = radioButton.value;
      }
    });

    const gicFeeRadioButtons = document.querySelectorAll(
        'input[name="gic"]'
      );
      let selectedGicFee = "";
      gicFeeRadioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
          selectedGicFee = radioButton.value;
        }
      });

      const userInputs = {
        name: name,
        program: program,
        email: email,
        age: age,
        past_institute: past_institute,
        work_experience: work_experience,
        institute: institute,
        admitted_program: admitted_program,
        country: country,
        future_goals: future_goals,
        listening_score: listening_score,
        reading_score: reading_score,
        speaking_score: speaking_score,
        writing_score: writing_score,
        paid_fees: paid_fees,
        paid_gic: paid_gic,
        education: education,
        tution_fee: tution_fee,
        selectedEducation: selectedEducation,
        selectedTuitionFee: selectedTuitionFee,
        selectedGicFee: selectedGicFee ,
      };
  
      
      const prompt = `I am applying for Student Visa in Canada. I have provided you with the details now generate me a statement of purpose. Details are: \n Dear Admissions Committee,\nI am writing this statement of purpose to express my interest in ${admitted_program}...\n${name} ${age}...\n i completed my highest level of education ${selectedEducation} from ${past_institute} and i studied ${program} there. And i am from ${country} country. \n My future goals are: ${future_goals} \n  I have work experience of ${work_experience} \n Now i want to pursue higher level of education from Canada and i have been admitted to ${institute} in program- ${admitted_program} and the status of my paid tution fee for first year is ${selectedTuitionFee} and i have already paid ${paid_fees}\n The status of my gic is ${selectedGicFee} and i have paid amount of ${paid_gic} \n My proficiency in English is shown by my scores. I scored ${listening_score} in English-listening, ${reading_score} in English Reading, ${writing_score} in English Writing and ${speaking_score} in English speaking\n \n I want you to follow a general template for a statement of purpose. Make my skills show and try to gain an acceptable response from the visa officer. Give me this template in different sections- 1. From and To section From must include the name, sample address, city, state, zip code and email. Whereas To contains To, Visa Officer, High Commission of Canada, City, State, Zip code \n 2. Subject-statement of purpose for studying in Canada \n 3. Introduction 4.Why the Program of Study in Canada at the Education Institute Name \n 5. Why Study in Canada: \n 6. My Future Goals: \n 7. Academic Background and Language Proficiency: \n 8. Finances: include the point of my paid fees already and gic \n 9. Conclusion: \n 10. Greetings with name ${name}. \n Give every paragraph in a minimum of 300 words.`;
  
      // Send the prompt to the backend
      const response = await fetch("/generate-sop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      
      const response2 = await fetch("/store-data", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(userInputs),
      });

    const result = await response.json();
    document.getElementById("result").textContent = result.message;
  });
