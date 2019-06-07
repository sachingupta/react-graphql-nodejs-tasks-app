import { UserModel } from "../../models/user";
import * as bcrypt from "bcryptjs";

export const authResolver = {
    createUser: function ({ userInput }: any) {
        return UserModel.findOne({ email: userInput.email })
            .then((user: any) => {
                if (user) {
                    throw new Error("User exists already");
                }
                return bcrypt.hash(userInput.password, 12)
                    .then((hasbPassword) => {
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
    }
};