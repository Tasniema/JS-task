document.addEventListener('DOMContentLoaded', function () {
  const inputContainer = document.querySelector('.input-container');
  const inputField = document.getElementById('inputField');
  const popup = document.getElementById('popup');
  const suggestionsList = document.getElementById('suggestionsList');

  const suggestions = ['Heading 1', 'Expandable Heading 1'];

  inputField.addEventListener('input', function () {
    const value = inputField.value;
    if (value.startsWith('/')) {
      showOptions(inputField);
    } else {
      hideSuggestions();
    }
  });

  inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (inputField.value.startsWith('/1')) {
        if (inputField.value.length > 2) {
          inputField.value = inputField.value.replace('/1 ', '');
          hideSuggestions();
          createHeading(inputField);
          addNewInputField();
        } else {
          filterSuggestions(inputField);
        }
      } else if (inputField.value.length > 0) {
        hideSuggestions();
        createHeading(inputField);
        addNewInputField();
      }
    } else if (event.key === 'Backspace' && inputField.value === '') {
      focusPreviousInputField(inputField);
    }
  });

  function showOptions(input) {
    const rect = input.getBoundingClientRect();
    popup.style.top = rect.bottom + 'px';
    popup.style.left = rect.left + 'px';
    popup.style.display = 'block';
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      const h1 = document.createElement('h3');
      const span = document.createElement('span');

      h1.textContent = suggestion;
      h1.classList.add('suggestion-header');

      span.textContent = 'Shortcut: type ' + suggestion + '+ space';
      span.classList.add('suggestion-subtext');

      li.appendChild(h1);
      li.appendChild(span);

      li.addEventListener('click', function () {
        input.placeholder = suggestion;
        input.value = '';
        input.classList.add('suggestion-placeholder');
        input.focus();
        hideSuggestions();
      });

      suggestionsList.appendChild(li);
    });
  }

  function hideSuggestions() {
    popup.style.display = 'none';
  }

  function filterSuggestions(input) {
    const filterText = input.value.substring(2);
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.includes(filterText)
    );

    suggestionsList.innerHTML = '<h2>Add Blocks</h2><p class="suggestion-subtext padd">Keep typing to filter, or escape to exit</p><div class="first-child special">Filtering keyword<img src="images/icons8-1-24.png" alt=""></div>';
    filteredSuggestions.forEach(suggestion => {
      const li = document.createElement('li');
      const h1 = document.createElement('h3');
      const span = document.createElement('p');
      const img = document.createElement('img');
      const div = document.createElement('div');

      li.classList.add('list');

      img.src = 'images/icons8-t-91.png';
      img.alt = '';
      img.classList.add('ticon');

      h1.textContent = suggestion;
      h1.classList.add('suggestion-header');

      const heading = '#';
      const subheading = '>>#';

      if (suggestion === 'Heading 1') {
        span.textContent = 'Shortcut: type ' + heading + ' + space';
      } else {
        span.textContent = 'Shortcut: type ' + subheading + ' + space';
      }

      span.classList.add('suggestion-subtext');

      div.classList.add('first');
      div.appendChild(h1);
      div.appendChild(span);
      li.appendChild(img);
      li.appendChild(div);

      li.addEventListener('click', function () {
        input.placeholder = suggestion;
        input.value = '';
        input.classList.add('suggestion-placeholder');
        input.focus();
        hideSuggestions();
      });

      suggestionsList.appendChild(li);
    });
  }

  function createHeading(input) {
    const text = input.value.substring(2);
    const heading = document.createElement('h1');
    heading.textContent = text;
    heading.className = 'inputone';
    inputContainer.replaceChild(heading, input);
  }

  function addNewInputField() {
    const newInputField = document.createElement('input');
    newInputField.type = 'text';
    newInputField.placeholder = 'Type / for blocks, @ to link docs or people';
    newInputField.classList.add('input');

    newInputField.addEventListener('input', function () {
      const value = newInputField.value;
      if (value.startsWith('/1')) {
        showOptions(newInputField);
      } else {
        hideSuggestions();
      }
    });

    newInputField.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && newInputField.value.startsWith('/1')) {
        event.preventDefault();
        filterSuggestions(newInputField);
      } else if (event.key === 'Enter') {
        addNewInputField();
      } else if (event.key === 'Backspace' && newInputField.value === '') {
        focusPreviousInputField(newInputField);
      }
    });

    inputContainer.appendChild(newInputField);
    newInputField.focus();
  }

  function focusPreviousInputField(currentInput) {
    const previousInput = currentInput.previousElementSibling;
    if (previousInput && previousInput.tagName === 'INPUT') {
      if (currentInput.value === '') {
        previousInput.focus();
        event.preventDefault();
      }
    }
  }

});
