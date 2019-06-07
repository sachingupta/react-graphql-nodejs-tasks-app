import { UserModel } from "../../models/user";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { tokenHashKey } from "./constants";


export const authResolver = {
    createUser: function ({ userInput }: any) {
        return UserModel.findOne({ email: userInput.email })
            .then((user: any) => {
                if (user) {
                    throw new Error("User exists already");
                }
                return bcrypt.hash(userInput.password, 12)
                    .then((hasbPassword: any) => {
                        const user = new UserModel({
                            email: userInput.email,
                            password: hasbPassword
                        });
                        return user.save()
                            .then((result: any) => {
                                return { ...result._doc };
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            });
    },

    login: async ({ email, password }: any) => {
        const user: any = await UserModel.findOne({ email: email });
        if (!user) {
            throw new Error("User doesn't exists");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Password is incorrect!");
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, tokenHashKey, {
            expiresIn: '1h'
        });
        return {
            userId: user.id,
            token,
            tokenExpiration: 1
        };
    }
};