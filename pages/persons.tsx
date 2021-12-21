import Head from 'next/head'
import Header from "../components/header";
import {gql} from "@apollo/client";
import client from "../api-client";

export async function getStaticProps() {
    const {data} = await client.query({
        query: gql`
            query {
              persons {
                id,
                name
              }
            }
      `,
    });

    return {
        props: {
            persons: data.persons.slice(0, 4),
        },
    };
}

export default function Home({persons}) {
    return (<div>
        <Head>
            <title>History DB</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Header/>
            {persons.map((person) => (
                <div key={person.id}>{person.name}</div>
            ))}
            <div className="mt-5 flex flex-col bg-white shadow-md px-8 py-6 rounded-3xl w-50 max-w-md">
                <div className="font-medium self-center text-xl text-gray-800">
                    人物登録 person!
                </div>
                <form className="mt-2">
                    <div className="mb-2">
                        <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                            名前:
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="text-sm p-2 rounded-2xl border border-gray-400 bg-gray-50 w-full shrink focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mb-1 text-xs tracking-wide text-gray-600 w-12">
                            説明:
                        </label>
                        <textarea
                            name="description"
                            className="text-sm p-2 rounded-2xl border border-gray-400 bg-gray-50 w-full shrink focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex w-20 mx-auto">
                        <button
                            type="submit"
                            className="focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition
                                      duration-150  ease-in"
                        >
                            送信
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>)
}
