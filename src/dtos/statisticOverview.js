class StatisticOverview {
  constructor({ totalPurchaser, totalCourse, totalUser, totalRevenue }) {
    this.totalPurchaser = totalPurchaser || 0;
    this.totalCourse = totalCourse || 0;
    this.totalUser = totalUser || 0;
    this.totalRevenue = totalRevenue || 0;
  }
}

export default StatisticOverview;
