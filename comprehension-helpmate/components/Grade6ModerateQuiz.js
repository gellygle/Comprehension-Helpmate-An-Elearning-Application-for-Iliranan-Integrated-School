import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  Image,
} from 'react-native';

const Grade6ModerateQuiz = () => {
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isCorrectModal, setIsCorrectModal] = useState(true);
  const [showVocabularyModal, setShowVocabularyModal] = useState(false);
  const [showNextPassageButton, setShowNextPassageButton] = useState(false);
  const [timer, setTimer] = useState(10);

  const passages = [
    {
      title: 'THE EYEBROWS',
      content:
        'Eyebrows are part of the face which serve two purposes—for beauty and protection.\nEyebrows make the face look more beautiful by calling attention to the eyes. They make the eyes look healthier and brighter.\nEyebrows not only beautify the face but also protect the eyes from sweat. Without the eyebrows, drops of sweat may run into the eyes and blur the sight. Sweat in itself is poisonous and should be rid-off.',
      image: require('./IMAGE/eyebrows.png'),
      questions: [
        {
          question: 'The part of the body mentioned in the selection is the',
          options: ['eyelashes', 'eyelids', 'eyebrows'],
          answer: 'eyebrows',
        },
        {
          question: 'They call attention to the',
          options: ['nose', 'eyes', 'cheeks'],
          answer: 'eyes',
        },
        {
          question: 'They make them look',
          options: ['uglier', 'healthier', 'funnier'],
          answer: 'healthier',
        },
        {
          question: 'Sweat can blur the sense of',
          options: ['sight', 'smell', 'hearing'],
          answer: 'sight',
        },
      ],
      vocabulary: [
        {
          word: 'Eyebrows',
          meaning:
            "The strip of hair growing on the ridge above a person's eye socket.",
        },
        { word: 'Beautify', meaning: 'To make beautiful or more beautiful.' },
        // ... (other vocabulary words)
      ],
    },
    {
      title: 'THE INTERNSHIP',
      content:
        'It has beemn a great experience as an intern at dna micro.\nEyebrows make the face look more beautiful by calling attention to the eyes. They make the eyes look healthier and brighter.\nEyebrows not only beautify the face but also protect the eyes from sweat. Without the eyebrows, drops of sweat may run into the eyes and blur the sight. Sweat in itself is poisonous and should be rid-off.',
      image: require('../comprehension.png'),
      questions: [
        {
          question: 'Whats the best thing in internship',
          options: ['eyelashes', 'eyelids', 'eyebrows'],
          answer: 'eyebrows',
        },
        {
          question: 'They call attention to the',
          options: ['nose', 'eyes', 'cheeks'],
          answer: 'eyes',
        },
        {
          question: 'They make them look',
          options: ['uglier', 'healthier', 'funnier'],
          answer: 'healthier',
        },
        {
          question: 'Sweat can blur the sense of',
          options: ['sight', 'smell', 'hearing'],
          answer: 'sight',
        },
      ],
      vocabulary: [
        {
          word: 'Eyebrows',
          meaning:
            "The strip of hair growing on the ridge above a person's eye socket.",
        },
        { word: 'Beautify', meaning: 'To make beautiful or more beautiful.' },
        // ... (other vocabulary words)
      ],
    },
    // ... (other passages)
  ];

  useEffect(() => {
    let timerInterval;
    if (showQuiz && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [showQuiz, timer]);

  useEffect(() => {
    if (showQuiz && timer === 0) {
      handleNextQuestion();
    }
  }, [timer, showQuiz]);

  const handleAnswerButtonClick = (option) => {
    clearInterval(timer);
    const currentPassage = passages[selectedPassage];
    const currentQuestionData = currentPassage.questions[currentQuestion];
    const isCorrect = option === currentQuestionData.answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowModal(true);
    setIsCorrectModal(isCorrect);
    setModalText(isCorrect ? 'Correct!' : 'Wrong!');

    setSelectedOption(option); // Set selected option for the current question

    setTimeout(() => {
      setShowModal(false);
      setIsCorrectModal(true); // Reset isCorrectModal state
      if (currentQuestion < currentPassage.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(10);
        setSelectedOption(null); // Reset selected option for the next question
      } else {
        setShowScore(true);
        setShowNextPassageButton(true);
        setTimer(0);
      }
    }, 2000);
  };

  const handleNextQuestion = () => {
    setShowModal(false); // Reset showModal state
    clearInterval(timer);
    const currentPassage = passages[selectedPassage];
    if (currentQuestion < currentPassage.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
      setShowNextPassageButton(true);
      setTimer(0);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
    setShowNextPassageButton(false);
    setTimer(10);
  };

  const handleNextPassage = () => {
    setSelectedPassage(null);
    setShowScore(false);
    setShowQuiz(false);
    setTimer(10);
  };

  const openVocabularyModal = () => {
    setShowVocabularyModal(true);
  };

  const closeVocabularyModal = () => {
    setShowVocabularyModal(false);
  };

  return (
    <View style={styles.container}>
      {selectedPassage === null ? (
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}>
          {/* Passage Selection Section */}
          <ScrollView contentContainerStyle={styles.passageListContainer}>
            {passages.map((passage, index) => (
              <TouchableOpacity
                key={index}
                style={styles.passageListItem}
                onPress={() => {
                  setSelectedPassage(index);
                  setShowQuiz(false);
                }}>
                <Text style={styles.passageListItemText}>{passage.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={styles.backgroundImage}>
          {showQuiz ? (
            <ScrollView contentContainerStyle={styles.quizContainer}>
              {/* Quiz Section */}
              {!showScore &&
                currentQuestion <
                  passages[selectedPassage].questions.length && (
                  <>
                    <Text style={styles.question}>
                      {
                        passages[selectedPassage].questions[currentQuestion]
                          .question
                      }
                    </Text>
                    {passages[selectedPassage].questions[
                      currentQuestion
                    ].options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.optionButton,
                          selectedOption === option &&
                            styles.selectedOptionButton,
                        ]}
                        onPress={() => handleAnswerButtonClick(option)}>
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                    <Text
                      style={
                        styles.timerText
                      }>{`Time Remaining: ${timer}s`}</Text>
                  </>
                )}
              {/* Result Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.modalContainer}>
                  <View
                    style={[
                      styles.modalContent,
                      isCorrectModal ? styles.correctModal : styles.wrongModal,
                    ]}>
                    <Text style={styles.modalText}>{modalText}</Text>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          ) : (
            // Passage Display Section
            <ScrollView contentContainerStyle={styles.passageContainer}>
              <Image
                source={passages[selectedPassage].image}
                style={styles.passageImage}
              />
              <Text style={styles.passageTitle}>
                {passages[selectedPassage].title}
              </Text>
              <ScrollView>
                <Text style={styles.passageContent}>
                  {passages[selectedPassage].content}
                </Text>
              </ScrollView>
            </ScrollView>
          )}

          {!showQuiz && (
            <View style={styles.buttonContainer}>
              {/* Proceed to Quiz Button */}
              <TouchableOpacity
                style={styles.proceedButton}
                onPress={() => {
                  setShowQuiz(true);
                  setTimer(10);
                }}>
                <Text style={styles.buttonText}>Proceed to Quiz</Text>
              </TouchableOpacity>
              {/* Vocabulary Button */}
              <TouchableOpacity
                style={styles.vocabButton}
                onPress={openVocabularyModal}>
                <Text style={styles.buttonText}>Vocabulary</Text>
              </TouchableOpacity>
            </View>
          )}

          {showScore && (
            // Score Display Section
            <View style={styles.scoreContainer}>
              <Text
                style={
                  styles.scoreText
                }>{`Your Score: ${score}/${passages[selectedPassage].questions.length}`}</Text>
              <View style={styles.buttonContainer}>
                {/* Retry Button */}
                <TouchableOpacity style={styles.button} onPress={handleRetry}>
                  <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
                {/* Next Passage Button */}
                <TouchableOpacity
                  style={[styles.button, styles.nextButton]}
                  onPress={handleNextPassage}>
                  <Text style={styles.buttonText}>Next Passage</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Vocabulary Modal */}
          {showVocabularyModal && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={showVocabularyModal}
              onRequestClose={closeVocabularyModal}>
              <View style={styles.vocabularyModalContainer}>
                <View style={styles.vocabularyModalContent}>
                  <Text style={styles.vocabularyModalTitle}>Vocabulary</Text>
                  {passages[selectedPassage].vocabulary.map((item, index) => (
                    <View key={index} style={styles.vocabularyItem}>
                      <Text style={styles.vocabularyText}>{item.word}</Text>
                      <Text style={styles.vocabularyMeaning}>
                        {item.meaning}
                      </Text>
                    </View>
                  ))}
                  {/* Close Vocabulary Modal Button */}
                  <TouchableOpacity
                    style={styles.closeVocabButton}
                    onPress={closeVocabularyModal}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passageListContainer: {
    padding: 20,
  },
  passageListItem: {
    backgroundColor: '#3498db',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  passageListItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  quizContainer: {
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#3498db',
  },
  optionButton: {
    backgroundColor: '#3498db',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#2980b9',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 16,
    marginTop: 10,
    color: '#e74c3c',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  correctModal: {
    backgroundColor: '#2ecc71',
  },
  wrongModal: {
    backgroundColor: '#e74c3c',
  },
  modalText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  passageContainer: {
    padding: 20,
    alignItems: 'center',
  },
  passageImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  passageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  passageContent: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  proceedButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
  },
  vocabButton: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: '#2ecc71',
  },
  retryButton: {
    backgroundColor: '#e74c3c',
  },
  vocabularyModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vocabularyModalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  vocabularyModalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  vocabularyItem: {
    marginBottom: 10,
  },
  vocabularyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  vocabularyMeaning: {
    fontSize: 18,
    color: '#555',
  },
  closeVocabButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
export default Grade6ModerateQuiz;
