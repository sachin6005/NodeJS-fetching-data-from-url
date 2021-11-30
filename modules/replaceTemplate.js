module.exports = replaceTemplate = (template, studentDetails) =>  {
    let output = template.replace(/{%ID%}/g ,studentDetails.id).replace(/{%NAME%}/g ,studentDetails.Name).replace(/{%JOB%}/g ,studentDetails.Job)
    return output
}
