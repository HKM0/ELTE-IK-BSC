<form>
  <input type="date">
  <button type="submit">Guess</button>
</form>
<output></output>

<script>
  const dateInput = document.querySelector("input");
  const button = document.querySelector("button");
  const output = document.querySelector("output");
  const form = document.querySelector("form");

  async function handleButtonClick() {
    const date = dateInput.value;

    const response = await fetch(`ajax.php?guess=${date}`);
    const answer = await response.json();

    output.innerHTML = answer.guess || answer.error;
  }
  button.addEventListener("click", handleButtonClick);

  function preventSubmit(event) {
    event.preventDefault();
  }
  form.addEventListener("submit", preventSubmit);
</script>