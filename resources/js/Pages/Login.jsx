import Loading from "@/Components/Loading";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const postLogin = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const data = {
            userid: userId,
            password: password,
        };
        await axios
            .post(route("postLogin"), data)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Anda berhasil login",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.get(res.request?.responseURL);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    Swal.fire("Gagal", err.response.data.message, "error");
                }
            });
        setIsloading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <Head>
                <title>Login Page</title>
            </Head>
            <div
                class="bg-no-repeat bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80')",
                }}
            >
                {/* <div class="lg:absolute lg:bg-gradient-to-b from-blue-700 to-blue-500 opacity-90 inset-0 z-0"></div> */}
                <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                        <div class="self-start hidden lg:flex flex-col  text-white">
                            <img src="" class="mb-3" />
                            <h1 class="mb-3 font-bold text-5xl">APOLLO</h1>
                            <p className="pt-2">Samarinda, Kalimantan Timur</p>
                        </div>
                    </div>
                    <div class="flex justify-center self-center px-5  z-10">
                        <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                            <div class="mb-4">
                                <h3 class="font-semibold text-2xl text-gray-800">
                                    Sign In{" "}
                                </h3>
                                <p class="text-gray-500">
                                    Please sign in to your account.
                                </p>
                            </div>
                            <div class="space-y-5">
                                <form onSubmit={postLogin}>
                                    <div class="space-y-2">
                                        <label class="text-sm font-medium text-gray-700 tracking-wide">
                                            Username
                                        </label>
                                        <input
                                            class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            type="text"
                                            value={userId}
                                            onChange={(e) =>
                                                setUserId(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                            Password
                                        </label>
                                        <input
                                            class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            class="w-full mt-2 flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="pt-5 text-center text-gray-400 text-xs">
                                <span>Copyright © 2023 APOLLO</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
