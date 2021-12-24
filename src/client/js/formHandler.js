function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formURL = document.getElementById("url").value;
  if (Client.checkForURL(formURL)) {
    console.log("::: Form Submitted :::");
    fetch("http://localhost:3000/getkey")
      .then((res) => res.json())
      .then(function (res) {
        const formdata = new FormData();
        formdata.append("key", res.key);
        formdata.append("url", formURL);
        formdata.append("sentences", "5");

        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        const response = fetch(
          "https://api.meaningcloud.com/summarization-1.0",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("results").innerHTML = data.summary;
          })
          .catch((error) => console.log("error", error));
      });
  } else {
    document.getElementById("results").innerHTML = "Please enter a valid URL!";
  }
}

export { handleSubmit };
