class StatisticOverview {
  constructor({ totalPurchaser, totalCourse, totalUser }) {
    this.totalPurchaser = totalPurchaser || 0;
    this.totalCourse = totalCourse || 0;
    this.totalUser = totalUser || 0;
  }
}

export default StatisticOverview;
