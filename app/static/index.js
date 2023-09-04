const form = document.getElementById("sop-form");
const loadingScreen = document.getElementById("loading-screen");
document.getElementById("sop-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    loadingScreen.style.display = "block";

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

    
    const userInputs2 = {
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

    // Send user inputs to backend
    const response = await fetch("/generate-sop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputs),
    });

    const response2 = await fetch("/store-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInputs2),
    });

    loadingScreen.style.display = "none";
    const result = await response.json();
    document.getElementById("result").textContent = result.message;
  });
