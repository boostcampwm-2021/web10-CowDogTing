module.exports = {
    apps: [{
        name: "cowdogting",
        script: "./src/bin/www.ts",
        instances: 0,
        exec_mode: "cluster"
    }]
};