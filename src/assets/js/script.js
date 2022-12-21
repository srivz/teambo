function myFunction() {
  var count = 0;
  if (count === 0) {
    document.querySelector(".action-box").style.display = "block";
    count += 1;
  } else {
    document.querySelector(".action-box").style.display = "none";
    count = 0;
  }
}
