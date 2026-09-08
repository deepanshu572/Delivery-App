
let apiUrl = "http://localhost/Delivery_Backend/admin/";
let imgUrl = "http://localhost/Delivery_Backend/admin";
let userId = localStorage.getItem("userId");

let imgVal = $("#profileImg");

imgVal.on("change", function () {

    let img = this.files[0];
    let showImg = URL.createObjectURL(img);
    console.log(
        img, showImg
    );

    $(".circle_img").html(`<img src='${showImg}' />`);
});
function handleInfoInsert(e) {
    e.preventDefault();
    let FirstName = $("#FirstName").val();
    let LastName = $("#LastName").val();
    let number = $("#number").val();
    let email = $("#email").val();
    let city = $("#city").val();
    let language = $("#language").val();
    let imgVal = $("#profileImg");
    let address = $("#address").val();
    let img = imgVal[0].files[0];

    const formData = new FormData();
    formData.append("type", "handleInfoInsert");
    formData.append("userId", userId);
    formData.append("FirstName", FirstName);
    formData.append("LastName", LastName);
    formData.append("address", address);
    formData.append("number", number);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("language", language);
    formData.append("image", img);


    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.status == "success") {
                console.log(response.data);
                alert(response.message);
                location.href = '/pages/onboarding-1.html';
            } else {
                console.log(response.message);
            }
        }
    })
}

function getPersonalDetails() {

    const formData = new FormData();

    formData.append("type", "getPersonalDetails");
    formData.append("userId", userId);

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                let data = response.data;

                $("#FirstName").val(data.first_name || "");
                $("#LastName").val(data.last_name || "");
                $("#number").val(data.mobile_number || "");
                $("#email").val(data.email || "");
                $("#city").val(data.city || "");
                $("#address").val(data.address || "");
                $("#language").val(data.language || "");

                // Existing profile image
                if (data.image_path) {

                    $(".circle_img").html(`
                        <img
                            src="${imgUrl + data.image_path}"
                            alt="Profile"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:cover;
                                border-radius:50%;
                            "
                        >
                    `);

                }

            } else {

                console.log(response.message);

            }
        },

        error: function (xhr, status, error) {

            console.log("AJAX Error:", error);
            console.log(xhr.responseText);

        }
    });
}


// Call when page loads





function handleUploadDocument(e) {
    e.preventDefault();
    let frontImg = $("#frontUpload");
    let backImg = $("#backUpload");
    let docName = $("#docName").val();


    const formData = new FormData();
    formData.append("type", "handleUploadDocument");
    formData.append("userId", userId);
    formData.append("frontImg", frontImg[0].files[0]);
    formData.append("docName", docName);
    formData.append("backImg", backImg[0].files[0]);
    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            if (response.status == "success") {
                console.log(response.message)
                alert(response.message);
                location.href = "doc-1.html";
            } else {
                console.log(response.message);
            }
        }
    })
}

function getSelectedDoc() {
    let docName = $("#docName").val();

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        data: {
            type: "getSelectedDoc",
            userId,
            docName
        },
        success: function (response) {
            if (response.status == "success") {
                let { back_image, front_image } = response.data[0];
                $("#backImg").html(`<img src='${imgUrl + back_image}'/>`);
                $("#frontImg").html(`<img src='${imgUrl + front_image}'/>`);





                console.log(response.data[0]);
            } else {
                console.log(response.message);
            }
        }
    })
}

function handleEmergencyDetail(e) {
    e.preventDefault();

    let contactPersonName = $("#contactPersonName").val();
    let relationship = $("#relationship").val();
    let emergencyMobile = $("#emergencyMobile").val();
    let alternateMobile = $("#alternateMobile").val();
    let emergencyAddress = $("#emergencyAddress").val();
    let emergencyCity = $("#emergencyCity").val();

    const formData = new FormData();

    formData.append("type", "handleEmergencyDetail");
    formData.append("userId", userId);
    formData.append("contactPersonName", contactPersonName);
    formData.append("relationship", relationship);
    formData.append("emergencyMobile", emergencyMobile);
    formData.append("alternateMobile", alternateMobile);
    formData.append("emergencyAddress", emergencyAddress);
    formData.append("emergencyCity", emergencyCity);

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                console.log(response.message);
                alert(response.message);

                location.href = "onboarding-1.html";

            } else {

                console.log(response.message);
                alert(response.message);

            }
        },

        error: function (xhr, status, error) {
            console.log("AJAX Error:", error);
            console.log(xhr.responseText);
        }
    });
}

function getEmergencyDetails() {

    const formData = new FormData();

    formData.append("type", "getEmergencyDetails");
    formData.append("userId", userId);

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                let data = response.data;

                $("#contactPersonName").val(data.contact_name || "");
                $("#relationship").val(data.relationship || "");
                $("#emergencyMobile").val(data.mobile_number || "");
                $("#alternateMobile").val(data.alternate_mobile_number || "");
                $("#emergencyAddress").val(data.address || "");
                $("#emergencyCity").val(data.city || "");

            } else {
                console.log(response.message);
            }
        },

        error: function (xhr, status, error) {
            console.log("AJAX Error:", error);
            console.log(xhr.responseText);
        }
    });
}



function handleBankInsert(e) {
    e.preventDefault();

    let accountHolderName = $("#accountHolderName").val();
    let bankName = $("#bankName").val();
    let accountNumber = $("#accountNumber").val();
    let ifscCode = $("#ifscCode").val();
    let branchName = $("#branchName").val();
    let accountType = $("#accountType").val();

    // let bankProof = $("#bankProof")[0].files[0];

    const formData = new FormData();

    formData.append("type", "handleBankInsert");
    formData.append("userId", userId);

    formData.append("accountHolderName", accountHolderName);
    formData.append("bankName", bankName);
    formData.append("accountNumber", accountNumber);
    formData.append("ifscCode", ifscCode);
    formData.append("branchName", branchName);
    formData.append("accountType", accountType);

    // if (bankProof) {
    //     formData.append("bankProof", bankProof);
    // }

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                console.log(response.message);
                alert(response.message);

                location.href = "onboarding-1.html";

            } else {

                console.log(response.message);
                alert(response.message);

            }
        },

        error: function (xhr, status, error) {

            console.log("AJAX Error:", error);
            console.log(xhr.responseText);

        }
    });
}
function getBankDetails() {

    const formData = new FormData();

    formData.append("type", "getBankDetails");
    formData.append("userId", userId);

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                let data = response.data;

                $("#accountHolderName").val(data.account_holder_name || "");
                $("#bankName").val(data.bank_name || "");
                $("#accountNumber").val(data.account_number || "");
                $("#ifscCode").val(data.ifsc_code || "");
                $("#branchName").val(data.branch_name || "");
                $("#accountType").val(data.account_type || "");

            } else {
                console.log(response.message);
            }
        },

        error: function (xhr, status, error) {
            console.log("AJAX Error:", error);
            console.log(xhr.responseText);
        }
    });
}



function handleVehicleInsert(e) {
    e.preventDefault();

    let vehicleType = $("#vehicleType").val();
    let vehicleNumber = $("#vehicleNumber").val();
    let vehicleBrand = $("#vehicleBrand").val();
    let vehicleModel = $("#vehicleModel").val();
    let vehicleColor = $("#vehicleColor").val();
    let registrationYear = $("#registrationYear").val();

    const formData = new FormData();

    formData.append("type", "handleVehicleInsert");
    formData.append("userId", userId);

    formData.append("vehicleType", vehicleType);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("vehicleBrand", vehicleBrand);
    formData.append("vehicleModel", vehicleModel);
    formData.append("vehicleColor", vehicleColor);
    formData.append("registrationYear", registrationYear);

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                console.log(response.message);
                alert(response.message);

                location.href = "onboarding-1.html";

            } else {

                console.log(response.message);
                alert(response.message);

            }
        },

        error: function (xhr, status, error) {

            console.log("AJAX Error:", error);
            console.log(xhr.responseText);

        }
    });
}


function getVehicleDetails() {

    const formData = new FormData();

    formData.append("type", "getVehicleDetails");
    formData.append("userId", userId);

    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {

            if (response.status == "success") {

                let data = response.data;

                $("#vehicleType").val(data.vehicle_type || "");
                $("#vehicleNumber").val(data.vehicle_number || "");
                $("#vehicleBrand").val(data.vehicle_brand || "");
                $("#vehicleModel").val(data.vehicle_model || "");
                $("#vehicleColor").val(data.vehicle_color || "");
                $("#registrationYear").val(data.registration_year || "");

            } else {
                console.log(response.message);
            }
        },

        error: function (xhr, status, error) {
            console.log("AJAX Error:", error);
            console.log(xhr.responseText);
        }
    });
}


function getAllBranch() {
    $.ajax({
        url: apiUrl,
        method: "POST",
        dataType: "JSON",
        data: {
            type: "getAllBranch"
        },
        success: function (response) {
            if (response.status == "success") {
                console.log(response.data);
                let data = response.data;
                let branchHtml = '<option value="0">Select Branch</option>';
                data.forEach((item)=>{
                    branchHtml+=`<option value="${item?.id}">${item?.name}</option>`;
                });
                $("#branchData").html(branchHtml);
            } else {
                console.log(response.message);
            }
        }
    })

}

function handleVerification() {
    let branchId = $("#branchData").val();
    // if(branchId == 0){
    //     alert("please select your branch");
    //     return;
    // }

    $.ajax({
        url:apiUrl,
        method:"POST",
        dataType:"JSON",
        data:{
            type:"handleVerification",
            branchId,
            userId
        },
        success :function (response) {
            if(response.status == "success"){
                alert(response.message);
                location.href="document-submit.html";
            }else{
                console.log(response.message);
            }
        }
    })
    
}

  function getDeliveryManStatus() {
        $.ajax({
            url:apiUrl,
            method:"POST",
            dataType:"JSON",
            data:{
                type:"getDeliveryManStatus",
                userId
            },
            success:function(response){
                if(response.status == "success"){
                    let status = response.data[0].status;
                    // let status="rejected"
                    $(".status-container").removeClass('active');
                    if(status == "pending"){
                        $(".pending-status").addClass("active")

                    } else if(status == "verified"){
                        $(".confirmed-status").addClass("active")

                    } if(status == "rejected"){
                        $(".rejected-status").addClass("active")

                    }
                 console.log(response.data[0].status);

                }else{

                }
            }
        })
      }
