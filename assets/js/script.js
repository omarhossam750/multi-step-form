const stepBtns = [...document.getElementsByClassName("step--btn")];
const stepIds = [...document.getElementsByClassName("step--id")];
const formSteps = [...document.getElementsByClassName("form__step")];
const goBackBtns = [...document.getElementsByClassName("go--back--btn")];
const nextStepBtns = [...document.getElementsByClassName("step--submit--btn")];
const plans = [...document.getElementsByClassName("plan")];
const planTypeCheckbox = document.getElementById("plan-type-checkbox");
planTypeCheckbox.checked = true;
let isPlanTypeYearly = false;

function updateSteps(stepId) {
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
      updateSteps(stepId)
    }
  }
});
goBackBtns.forEach(btn => {
  btn.onclick = () => {
    const stepId = getStepIdFromElement(btn);
    updateSteps(stepId - 1) 
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
      case 2:
        validateStep2();
        break;
      case 3:
        stepIds[2].classList.add("finished");
        updateSteps(4);
        getSummary();
        break;
      case 4:
        stepIds[3].classList.add("finished");
        updateSteps(5);
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
    if (value.trim() === "" || numOfAt !== 1) return false;

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
  updateSteps(2);
}

// PLANS //
plans.forEach(plan => plan.onclick = () => {
  plans.forEach(x => x.classList.contains("chose") ? x.classList.remove("chose") : "");
  plan.classList.toggle("chose");
});


function switchBillingType() {
  const nums = [...document.querySelectorAll(".price-num")];
  const billings = [...document.querySelectorAll(".billing")];
  const offerMsg = document.getElementById("offer");
  
  if (isPlanTypeYearly) {
    nums.forEach(num => num.textContent = Number(num.textContent) / 10);
    billings.forEach(billing => billing.textContent = "mo");
    isPlanTypeYearly = false;
    offerMsg.style.display = "none";
    return;   
  }
  nums.forEach(num => num.textContent = Math.floor(Number(num.textContent) * 10));
  billings.forEach(billing => billing.textContent = "year");
  isPlanTypeYearly = true;
  offerMsg.style.display = "block";
}

switchBillingType();

planTypeCheckbox.onclick = switchBillingType;  


function validateStep2() {
  let isThisPlanChose = 0;
  const validateMessage = document.querySelector("#form__step__2 .validate--message");
  plans.forEach(plan => {
    if (plan.classList.contains("chose")) isThisPlanChose = 1;
  })
  if (isThisPlanChose !== 1) {
    validateMessage.textContent = "Please select a plan";
    return;
  }
  validateMessage.textContent = "";
  
  stepIds[1].classList.add("finished");
  updateSteps(3);
}
/**** ADD-ONS ****/   

/**** SUMMARY ****/
function getSummary() {
  const summaryStep = document.getElementById("form__step__4");
  // Plans
  const planTitle = document.querySelector(".plan.chose .plan-title").textContent;
  const planPrice = document.querySelector(".plan.chose .price").textContent;
  const planPriceNum = document.querySelector(".plan.chose .price-num").textContent;
  // Addons
  const addonsTitles = [...document.querySelectorAll(".addons .addon-checkbox:checked ~ label .addon--title")];
  const addonsPrices = [...document.querySelectorAll(".addons .addon-checkbox:checked ~ .addon-price")];
  const addonsPriceNum =  [...document.querySelectorAll(".addons .addon-checkbox:checked ~ .addon-price .price-num")];
  
  const summaryContainer = document.getElementById("summary");
  
  summaryContainer.innerHTML = `
    <div class="plan-summary flex space-between align-center">
      <div>
        <p class="plan-title">${planTitle} (${isPlanTypeYearly ? "Yearly" : "Monthly"})</p>
        <button onclick="updateSteps(2)">Change</button>
      </div>
      <span><strong>${planPrice}</strong><span>
    </div>
  `
  if (addonsTitles.length) {
    summaryContainer.innerHTML += `
      <hr>
      <div class="addons-summary">
    `

    for (let i = 0; i < addonsTitles.length; i++) {
      let [currTitle, currPrice] = [addonsTitles[i].textContent, addonsPrices[i].textContent];
      summaryContainer.innerHTML += `
          <div class='_addon_ flex space-between align-center'>
            <p>${currTitle}</p>
            <p>${currPrice}</p>
          </div>
      `
    }
    summaryContainer.innerHTML += `</div>`;
  }
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = Number(planPriceNum);
  addonsPriceNum.forEach(num => totalPrice += Number(num.textContent));
  let totalPriceForamt = `+$${totalPrice}/${isPlanTypeYearly ? "year" : "mo"}`;
  
  totalPriceElement.innerHTML = `
    <p>Total (per ${isPlanTypeYearly ? "year" : "month"})</p>
    <p class="total-price">${totalPriceForamt}</p>  
  `
}
