class AttendanceOfCourse {
  constructor({ year, data }) {
    console.log(year);
    this.year = year || '';
    this.analysis = data || [];
  }
}

export default AttendanceOfCourse;
