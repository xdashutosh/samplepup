import { scrap } from "./scrap.js"

export const routes = (app)=>{
    app.post("/get-sites",scrap)
}