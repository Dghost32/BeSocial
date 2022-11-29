const getAverage = (array) => array.reduce((a, b) => a + b) / array.length;

const getMax = (array) => array.reduce((a, b) => Math.max(a, b));

const getMin = (array) => array.reduce((a, b) => Math.min(a, b));

const getTotal = (array) => array.reduce((a, b) => a + b);

// 1 book = 5 hours
const getBookEquivalent = (hours) => {
  let bookEquivalent = Math.floor(hours / 5);
  return bookEquivalent;
};

// 1 film = 1.5 hours
const getMovieEquivalent = (hours) => {
  let movieEquivalent = Math.floor(hours / 1.5);
  return movieEquivalent;
};

// 4 miles = 1 hour
const getMilesEquivalent = (hours) => {
  let milesEquivalent = Math.floor(hours * 4);
  return milesEquivalent;
};

//17 songs = 1 hour
const getSongsEquivalent = (hours) => {
  let songsEquivalent = Math.floor(hours * 17);
  return songsEquivalent;
};

const getProgress = (first, last) => {
  let percent = (last * 100) / first - 100;
  percent = Math.floor(percent);
  //check if the percent increased or decreased
  if (percent > 0) {
    return {
      value: percent + "%",
      label: "Increased",
      icon: "angle double up",
      color: "red",
      description: "Your usage by " + percent + "%",
    };
  }

  if (percent < 0) {
    return {
      value: Math.abs(percent) + "%",
      label: "Decreased",
      icon: "angle double down",
      color: "green",
      description: "Your usage by " + Math.abs(percent) + "%",
    };
  }

  return {
    value: "0%",
    label: "No change",
    icon: "minus",
    color: "grey",
    description: "In your usage",
  };
};

export {
  getAverage,
  getMax,
  getMin,
  getTotal,
  getBookEquivalent,
  getMovieEquivalent,
  getMilesEquivalent,
  getSongsEquivalent,
  getProgress,
};
