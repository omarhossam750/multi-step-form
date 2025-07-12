const stepBtns = [...document.getElementsByClassName("step--btn")];
const stepIds = [...document.getElementsByClassName("step--id")];
const formSteps = [...document.getElementsByClassName("form__step")];
const goBackBtns = [...document.getElementsByClassName("go--back--btn")];
const nextStepBtns = [...document.getElementsByClassName("step--submit--btn")];

function udpateSteps(stepId) {
  const formStep = document.getElementById(`form__step__${stepId}`);
  if (formStep.classList.contains("active")) return;
  
  formSteps.forEach(x => x.classList.contains("active") ? x.classList.remove("active") : "");
  
  void formStep.offsetWidth
  formStep.classList.add("active");
}
function getStepIdFromElement(el) {
  const idStr = el.parentElement.parentElement.id || el.parentElement.parentElement.parentElement.id;
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
  btn.onclick = (e) => {
    e.preventDefault();
    const stepId = getStepIdFromElement(btn);
    switch(stepId) {
      case 1:
        validateStep1();
        break;
    }
  }
});

function validateSuccess() {
  return ["mediumseagreen", ""]
} 
function validateError(inputTitle) {
  return ["red", `Please enter a vaild ${inputTitle}*`];
}

function validateStep1() {
  function isValidEmail(value) {
    let numOfAt = 0, atIndex = -1;
    
    value.split('').forEach(letter => numOfAt += letter === "@" ? 1 : 0);
    console.log(numOfAt)
    if (value.trim() === "" || numOfAt !== 1) return false;

    console.log("HERE!")
    for (let i = 0; i < value.length; i++) {
      atIndex = value.split('')[i] === "@" ? i : -1; 
      if (atIndex !== -1) break;
    }
    
    if (atIndex !== -1) {
      try {
        const valueArr = value.slice(atIndex + 2, value.length).split('')
        for (let i = 0; i < valueArr.length; i++) {
          if (valueArr[i] === ".") {
            if (valueArr[i + 1]) {
              return true;
            }
          }
        }
      } catch (error) { return false; }
    }
    
    return false;
  }
  
  const userName = document.getElementById("user--name");
  const userEmail = document.getElementById("user--email");
  const userPhone = document.getElementById("user--phone");
  
  const validateMessage = document.querySelector("#form__step__1 .validate--message");
  
  if (userName.value === "") {  
    [userName.style.outlineColor, validateMessage.textContent] = validateError("Name");
    userName.onkeyup = () => { 
      [userName.style.outlineColor, validateMessage.textContent] = validateSuccess()
    }
    return; 
  } else { [userName.style.outlineColor, validateMessage.textContent] = validateSuccess(); }
  
  if (!isValidEmail(userEmail.value)) { 
    [userEmail.style.outlineColor, validateMessage.textContent] = validateError("Email");
    
    userEmail.onkeyup = function() {
      if (isValidEmail(userEmail.value)) {
        [userEmail.style.outlineColor, validateMessage.textContent] = validateSuccess()
      } else {
        [userEmail.style.outlineColor, validateMessage.textContent] = validateError("Email");
      }
    }
    return;
  } else { [userEmail.style.outlineColor, validateMessage.textContent] = validateSuccess(); }
  
  stepIds[0].classList.add("finished");
  udpateSteps(2);
}
