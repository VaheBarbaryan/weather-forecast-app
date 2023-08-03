import { format } from 'date-fns'

export const formatDailyForecast = list => {
    return list.filter((_, index) => index % 8 === 0).map(item => {
        const { main: { temp: dailyTemp }, weather: [{ icon: dailyIcon }] } = item
        const dailyIconUrl = `https://openweathermap.org/img/w/${dailyIcon}.png`
        const dailyDate = new Date(item.dt_txt)
        return {
            temp: Math.round(dailyTemp),
            iconUrl: dailyIconUrl,
            date: format(dailyDate, 'EEE')
        }
    })
}

export const formatHourlyForecast = list => {
    return list.map(item => {
        const { main: { temp: hourlyTemp }, weather: [{ icon: hourlyIcon }] } = item
        const hourlyIconUrl = `https://openweathermap.org/img/w/${hourlyIcon}.png`
        const hourlyMeridiem = new Date(item.dt_txt)
        const hourlyDate = new Date(item.dt_txt)
        let hour = format(hourlyMeridiem, 'p')
        hour = hour.substring(0, hour.length - 3)
        return {
            temp: Math.round(hourlyTemp),
            iconUrl: hourlyIconUrl,
            meridiem: hour,
            date: format(hourlyDate, 'EEE')
        }
    })
}