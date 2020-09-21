const answerButtonsElement = document.getElementById('yes-btn')
const QuestionElement = document.getElementById('question-container')
const FormElement = document.querySelector('.form-area-outer')
const imgg= document.getElementById('imgg')
const synth = window.speechSynthesis;
let voices=[];
let st = 1;
var tl = gsap.timeline();
tl.from("video", {duration: 1, x: 300, opacity: 1, scale: 2, ease: Power2.easeInOut}, "+=3")
  .from(".container",{duration: 1, x: 0, opacity: 1, scale: 0, ease: Power2.easeInOut},"-=1")
const getVoices = () => {
    
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if ( aname < bname ) return -1;
        else if ( aname == bname ) return 0;
        else return +1;
    });
}  

document.querySelector("#yes-btn").click();
getVoices;
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

function readOutLoud(message){

  
  const speech = new SpeechSynthesisUtterance();
  speech.voice= voices[23];
  speech.volume = 1;
  speech.text = message;
  speech.pitch= 1;
  speech.speed= 0.8;
  
  
  window.speechSynthesis.speak(speech);


}

 
/*annyang.addCallback('result', function(phrases) {
  console.log("I think the user said: ", phrases[0]);
 
  
});
*/

FormElement.classList.add('hide')
imgg.classList.add('hide')

//readOutLoud('Hello! You are not registered. Do you want to register yourself?');

function hello(){
  readOutLoud("You are not registered. Do you want to register yourself?")
  yesfunc()
}

function yesfunc(){
  annyang.addCallback('result', function(phrases) {
    
    if (phrases[0].match(/yes/g) && (st == 1)) {
      answerButtonsElement.classList.add('correct')
      setTimeout(formfill,1000)
      

  }})



 /* if (annyang) {
    //readOutLoud("You are not registered. Do you want to register yourself?")
      var commands = {
        "yes": function () {
          
              answerButtonsElement.classList.add('correct')
              setTimeout(formfill,1000)
              
            
              
          
        },
        "no": function(){
          
          nofunc()

        }
      }
      annyang.addCommands(commands);
      */
          // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
      
  
}
function formfill(){
    st=2;
    QuestionElement.classList.add('hide')
    FormElement.classList.remove('hide')
    readOutLoud("Please fill out the form")
    readOutLoud("Speak '''enter''' followed by the field you want to fill.")
    readOutLoud("Speak submit form when you are finished")

    annyang.addCallback('result', function(phrases) {
      console.log("I think the user said: ", phrases[0]);
     
      if (phrases[0].match(/enter username/g)){
        let vaaa= phrases[0].split(/enter username /);
        console.log(vaaa[1]);
        let uname = document.getElementById("uname");
        uname.value=vaaa[1];
      }
      if (phrases[0].match(/enter email/g)){
        let vaaa= phrases[0].split(/enter email /);
        console.log(vaaa[1]);
        let emailadd = document.getElementById("emailadd");
        variable= vaaa[1].replace('at','@')
        emailadd.value=variable.split(" ").join("");
      }
      if (phrases[0].match(/enter number/g)){
        let vaaa= phrases[0].split(/enter number /);
        console.log(vaaa[1]);
        let mobnum = document.getElementById("telnum");
        mobnum.value=vaaa[1];
      }
      if (phrases[0].match(/enter Department/g)){
        let vaaa= phrases[0].split(/enter Department /);
        console.log(vaaa[1]);
        let mymessage = document.getElementById("mymessage");
        mymessage.value=vaaa[1];
      }
      
    });
    if (annyang) {
        var commands = {
          
          
          'enter username *tag':function(variable){
              let uname = document.getElementById("uname");
              uname.value=variable;
          },
          'enter email *tag':function(variable){
              let emailadd = document.getElementById("emailadd");
              variable= variable.replace('at','@')
              emailadd.value=variable.split(" ").join("");
          },
          'enter mobile *tag':function(variable){
              let mobnum = document.getElementById("telnum");
              mobnum.value=variable;
          },
          'enter department *tag':function(variable){
              let mymessage = document.getElementById("mymessage");
              mymessage.value=variable;
          },
          "submit form": function(e){
            let myform = document.getElementById("myform");  
            let formareainner = document.querySelector('.form-area-inner');  
            let formheading = document.querySelector('.form-area-inner h2'); 
            myform.remove();
            formheading.innerHTML = 'Your Form is successfully submitted'
            let html = '';
            html += `<p>You have been registered into the sytem</p>`;
            formareainner.innerHTML += html;
            readOutLoud("Congratulations! you have been successfully registered")

            
          }
          
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
      }
}

function nofunc(){
  QuestionElement.classList.add('hide')
  imgg.classList.remove('hide')
  if (annyang) {
    //readOutLoud("You are not registered. Do you want to register yourself?")
      var commands = {
        "go back": function () {
          
          imgg.classList.add('hide')
          QuestionElement.classList.remove('hide')
           
            
              
          
        },
        
      }
      annyang.addCommands(commands);
  
          // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
      
  }
}
