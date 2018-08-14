var winner = ""
$(function(){
  produceCheckboxes()
  $('button').click(function(){
    $('#result').append(analyzeScore())
    event.preventDefault()
  })
})
// var conclusions =
// {
//   'needResources' : {
//
//   },
//   'doingOkay' : {
//
//   },
//   'atRisk' : {
//
//   }
// }
var questionTypes =
{
  'signs' : {
    'findScore' : function(count){
      return count*=0.5
    },
    'name' : 'warning-signs',
    'blurb': 'Which of these stress warning signs apply to you?',
    'checkBoxes' : [
      {
////        'value' : 'irritable',
        'label' : 'I\'m often irritable'
      },
      {
        //'value' : 'libido',
        'label' : 'I have a reduced libido'
      },
      {
        //'value' : 'appetite',
        'label' : 'I sometimes have too much or too little appetite'
      },
      {
        //'value' : 'emotion',
        'label' : 'I am often emotionally unavailable'
      },
      {
        //'value' : 'satisfaction',
        'label' : 'I rarely find satisfaction after accomplishing something'
      },
    ]
  },
  'symptoms' : {
    'findScore' : function(count){
      return count
    },
    'name' : 'health-symptoms',
    'blurb': 'Do you experience any of the following health symptoms?',
    'checkBoxes' : [
      {
        //'value' : 'acne',
        'label' : 'I have pervasive acne'
      },
      {
        //'value' : 'headaches',
        'label' : 'I have constant headaches'
      },
      {
        //'value' : 'pain',
        'label' : 'I have chronic pain'
      },
      {
        //'value' : 'illness',
        'label' : 'I am frequently ill.'
      },
      {
        //'value' : 'insomnia',
        'label' : 'I often experience insomnia'
      },
      {
        //'value' : 'depression',
        'label' : 'I am often depressed'
      },
      {
        //'value' : 'sweat',
        'label' : 'I am sweaty all the time'
      },
      {
        //'value' : 'lethargic',
        'label' : 'I sometimes feel lethargic for no reason'
      },
    ]
  },
  'coping' : {
    'findScore' : function(count){
      return count*-1
    },
    'name' : 'coping-methods',
    'blurb': 'Which of the following coping methods have you used?',
    'checkBoxes' : [
      {
        //'value' : 'biasdke',
        'label' : 'I consume more than three cups of coffee a day'
      },
      {
        //'value' : 'bike',
        'label' : 'I engage in cigarette smoking'
      },
      {
        //'value' : 'bike',
        'label' : 'I hurt myself so I can feel feelings'
      },
      {
        //'value' : 'bike',
        'label' : 'I drink more than three alcoholic bevarages a day'
      },
      {
        //'value' : 'bike',
        'label' : 'I spend more than 10% of my income on frivolities'
      },
      {
        //'value' : 'bike',
        'label' : 'I eat more than 10,000 calories a day'
      },
    ]
  }
}
function produceCheckboxes() {
  for (var typeKey in questionTypes) {
    // loop through all the questionTypes keys
    var questionObj = questionTypes[typeKey]
    var name = questionObj.name
    var blurb = questionObj.blurb
    $('#question-area').append('<h5>'+blurb+'<h5>')
    // loop through the checkBoxes array
    for (var i=0;i<questionObj.checkBoxes.length;i++) {
      var checkbox = questionObj.checkBoxes[i]
      var value = checkbox.value
      var label = checkbox.label
      $('#question-area').append(`<input type="checkbox" name=`+name+` value=`+value+`> `+label+`<br>`)
    }
    $('#question-area').append(`<hr>`)
  }
}
function tallyScores() {
  var total = 0
  for (var typeKey in questionTypes) {
    var questionObj = questionTypes[typeKey]
    var sectionName = questionObj.name
    var count = $('input[name='+sectionName+']:checked').length
    total += questionObj.findScore(count)
  }
  console.log("converted total " + total)
  return total
}
function analyzeScore() {
  var score = tallyScores()
  var advice = ""
  if (score < 0) {
    advice = "You're doing pretty good."
  } else if (score > 0) {
    advice = "You need to go to a doctor."
  } else {
    advice = "You should consider seeking help.."
  }
  console.log(advice)
  return advice
}
