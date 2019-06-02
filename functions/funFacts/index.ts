import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import axios from "axios";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const { data } = await axios.get('https://cat-fact.herokuapp.com/facts');

    const fact = data.all[Math.floor(Math.random() * data.all.length)];

    context.res = {
        body: fact,
        header: {
            "Content-Type" : "application/json"
        }
    }
};

export default httpTrigger;
