const stepBtns = [...document.getElementsByClassName("step--btn")];
const formSteps = [...document.getElementsByClassName("form__step")]
const goBackBtns = [...document.getElementsByClassName("go--back--btn")]
const nextStepBtns = [...document.getElementsByClassName("step--submit--btn")]

function udpateSteps(stepId) {
  const formStep = document.getElementById(`form__step__${stepId}`);
  if (formStep.classList.contains("active")) return;
  
  formSteps.forEach(x => x.classList.contains("active") ? x.classList.remove("active") : "");
  
  void formStep.offsetWidth
  formStep.classList.add("active");
}
function getStepIdFromElement(el) {
  const idStr = el.parentElement.parentElement.id;
  return Number(idStr[idStr.length - 1]) 
}
stepBtns.forEach(step => {
  step.onclick = () => {
    if (step.firstElementChild.classList.contains("finished")) {
      const stepId = step.firstElementChild.textContent;
      udpateSteps(stepId)
    }
  }
});
goBackBtns.forEach(btn => {
  btn.onclick = () => {
    const stepId = getStepIdFromElement(btn);
    udpateSteps(stepId - 1) 
  }
});
nextStepBtns.forEach(btn => {
  btn.onclick = () => {
    const stepId = getStepIdFromElement(btn);
    if (stepId === 1) return;
    udpateSteps(stepId + 1);
  }
})
