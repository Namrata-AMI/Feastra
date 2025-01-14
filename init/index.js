const mongoose = require("mongoose");
const menu = require("../models/menu");
const order = require("../models/order");
const initData = require("./data");
const dbUrl = "mongodb://127.0.0.1:27017/Feastara";

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(dbUrl);
}

const initmenu = async()=>{
    await menu.deleteMany({});
    initData.sampleMenu = initData.sampleMenu.map((menus)=>({
        ...menus,
        owner:"6606423fd4b7ebd8ad6efbc1",
    }))
    await menu.insertMany(initData.sampleMenu);
    console.log("menu initialised");
}

const initorder = async()=>{
    await order.deleteMany({});
    initData.sampleOrder = initData.sampleOrder.map((orders)=>({
        ...orders,
        owner:"6606423fd4b7ebd8ad6efbc1",
    }))
    await order.insertMany(initData.sampleOrder);
    console.log("order initialised");
}

initmenu();
initorder();
