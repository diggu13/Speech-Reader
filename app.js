const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];
  
  data.forEach(createBox);


  function createBox(item){
      const box = document.createElement('div');
      const {image,text} = item;
      box.className = 'box';
      box.innerHTML = `
      <img src="${image}"/>
      <p class = "info">${text}</p>
      `
      box.addEventListener('click',()=>{
          setTextMessage(text);
          speakText();

          box.classList.add('active');
          setTimeout(()=>box.classList.remove('active'),800);
      })
      main.appendChild(box) 
    }

    // init speech synth
    const message = new SpeechSynthesisUtterance();

    // store voices
    const voices =[];

    function populateVoiceList() {
        if(typeof speechSynthesis === 'undefined') {
          return;
        }
      
        var voices = speechSynthesis.getVoices();
      
        for(var i = 0; i < voices.length; i++) {
          var option = document.createElement('option');
          option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
          if(voices[i].default) {
            option.textContent += ' -- DEFAULT';
          }
      
          option.setAttribute('data-lang', voices[i].lang);
          option.setAttribute('data-name', voices[i].name);
          voicesSelect.appendChild(option);
        }
      }
      
      populateVoiceList();
      if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
      }

    //   set text 
    function setTextMessage(text){
        message.text = text;
    }

    // speak text 
    function speakText(){
        speechSynthesis.speak(message)
    }

    function setVoice(e){
        message.voice = voices.find(voice=> voice.name === e.target.value);
    }
    
    // toggle text box 
    toggleBtn.addEventListener('click',()=>document.getElementById('text-box').classList.toggle('show'));
    
    closeBtn.addEventListener('click',()=>{
        document.getElementById('text-box').classList.remove('show')
    });

    // change voice
    voicesSelect.addEventListener('change',setVoice);
    
    // read text btn
    readBtn.addEventListener('click',()=>{
        setTextMessage(textArea.value);
        speakText();
    })