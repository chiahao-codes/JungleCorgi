
const setTodaysDate = () => {
    const todaysDate = new Date();
    console.log(todaysDate, typeof todaysDate);
    const dateFormat = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
    });

    const todaysDateFormat = dateFormat.format(todaysDate);
    return todaysDateFormat
}

export default setTodaysDate

