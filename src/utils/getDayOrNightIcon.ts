

export function getDayOrNightIcon (iconName: string , dataTimeString: string):string{
    const hours = new Date(dataTimeString).getHours() // get hours from the given date and time string

    const isDateTime = hours >= 6 && hours < 18  // consider daytime from 6 am to 6 pm

    return isDateTime ? iconName.replace(/.$/ , "d") : iconName.replace(/.$/ , "n")
}