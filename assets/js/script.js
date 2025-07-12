const stepBtns = [...document.getElementsByClassName("step--btn")];
const formSteps = [...document.getElementsByClassName("form__step")]
stepBtns.forEach(step => {
  step.onclick = function() {
    const stepId = step.firstElementChild.textContent;
    const formStep = document.getElementById(`form__step__${stepId}`);
    if (formStep.classList.contains("active")) return;
    
    formSteps.forEach(x => x.classList.contains("active") ? x.classList.remove("active") : "");
    
    void formStep.offsetWidth
    formStep.classList.add("active");
  }
})
function validateForm1() {
  
}
