import { environment } from '../../environments/environment';

export var url = environment.apiPath;
export var methods = {
    tweets: "/tweets",
    tweetsfromdb: "/tweets/fromdb",
    admin: {
        login: "/login"
    }
}