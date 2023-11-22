$(document).ready(function () {
  // Initialization
  $(".image-section").hide();
  $(".loader").hide();
  $("#result").hide();

  // Function to preview uploaded image
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css('background-image', 'url(' + e.target.result + ')');
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Event listener for image upload
  $("#imageUpload").change(function () {
    $(".image-section").show();
    $("#btn-predict").show();
    $("#result").text("");
    $("#result").hide();
    readURL(this);
  });

  // Event listener for predict button
  $("#btn-predict").click(function () {
    var form_data = new FormData($("#upload-file")[0]);

    // Show loading animation
    $(this).hide();
    $(".loader").show();

    // Make prediction by calling an API (e.g., /predict)
    $.ajax({
      type: "POST",
      url: "/upload", // Replace with your API endpoint
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        $(".loader").hide();
        $("#result").fadeIn(600);
        $("#result").text(" Result:  " + data);
        console.log("Success!");
      },
    });
  });
});
