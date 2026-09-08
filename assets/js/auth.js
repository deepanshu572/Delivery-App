let apiUrl = "http://localhost/Delivery_Backend/admin/";



function handleMobileNumberSubmit(e){
     e.preventDefault();
     const phoneInp = document.querySelector('.phone_num');
     const phone = phoneInp.value.trim();
     let otp = generateOtp();
     localStorage.setItem("phone", phone);
     localStorage.setItem("otp", otp);
     location.href = 'otp.html';
  }


  function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000);
  }





  const otpInputs = document.querySelectorAll(".otp_inputs input");
  
  

  function fillOTP(otp) {

    const pasteData = otp
      .replace(/\D/g, "")
      .slice(0, otpInputs.length);

    pasteData.split("").forEach((char, i) => {
      if (otpInputs[i]) {
        otpInputs[i].value = char;
      }
    });

    const lastFilledIndex = pasteData.length - 1;

    if (otpInputs[lastFilledIndex]) {
      otpInputs[lastFilledIndex].focus();
    }
  }


  otpInputs.forEach((input, index) => {

    // Auto next
    input.addEventListener("input", (e) => {

      const value = e.target.value;

      // Allow only numbers
      e.target.value = value.replace(/[^0-9]/g, "");

      if (e.target.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

    });


    // Auto back
    input.addEventListener("keydown", (e) => {

      if (
        e.key === "Backspace" &&
        !input.value &&
        index > 0
      ) {
        otpInputs[index - 1].focus();
      }

    });


    // Paste full OTP
    input.addEventListener("paste", (e) => {

      e.preventDefault();

      const pasteData = e.clipboardData
        .getData("text");

      fillOTP(pasteData);

    });

  });

  function handleOtpLogin(e) {
    location.href='pages/profile.html';
    e.preventDefault();
    let otp = localStorage.getItem("otp");
    let phone = localStorage.getItem("phone");
    let otpUser = document.querySelectorAll(".otp_inputs input");
    let otpVal = "";
    otpUser?.forEach((item) => {
      otpVal += item.value;
    });

    if (otpVal.length < 6) {
      alert("Please enter valid OTP");
      return;
    }
    if (otpVal == otp) {
      $.ajax({

        url:apiUrl,
        method:"POST",
        dataType:"JSON",
        data:{
          type:"authentication",
          phone
        },
        success: function (response) {
          if(response.status == "success"){
            console.log(response.userId);
            let userId = response.userId;
            alert("OTP verified successfully");
             location.href='pages/profile.html';
             localStorage.removeItem("otp");
             localStorage.removeItem("phone");
            localStorage.setItem("userId",userId);
          }else{
            console.log(response.message);
          }
        }
      })
    }
    else {
      alert("Invalid OTP");
    }
  }


