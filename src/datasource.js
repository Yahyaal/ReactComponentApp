/**
A simple datasource that returns a JSON object
**/

function machineObj(machineId) {
    return {
        _id: machineId,
        cpuUsage: ((Math.floor(Math.random() * 100))) //returns 0-100 inclusive
    };
}

// run machineObj function every 1 second
var cpuObj = machineObj(100);
console.log('cpu: ', cpuObj);
let cpuNodes = []
for (const id of Array(3).keys()) {
    cpuNodes.push(machineObj(id))
}

setInterval(function () {
    cpuObj = machineObj(10)
    // for (const i of Array(3).keys()) {
    //     cpuNodes[i] = machineObj(i)
    // }
    // console.log('cpuUsage00: ', cpuUsage);
}, 1000);
export { cpuObj, cpuNodes };