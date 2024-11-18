function decisionTree(marks) {
    // Placeholder decision tree logic
    const { subject1, subject2, subject3, subject4 } = marks;
    const total = Number(subject1) + Number(subject2) + Number(subject3) + Number(subject4);
  
    if (total >= 320) return 'Science (PCMB, PCMC, PCME)';
    else if (total >= 240) return 'Commerce';
    else return 'Arts';
  }
  
  export default decisionTree;