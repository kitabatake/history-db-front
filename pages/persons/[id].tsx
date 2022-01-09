import {useRouter} from 'next/router'
import {ReactElement} from "react";
import {gql, useQuery} from "@apollo/client";
import Link from "next/link";

const personQuery = gql`
query getPerson($id: Int!) {
    person(id: $id) {
        id,
        name,
        description,
        relations {
            id,
            description,
            persons {
                id,
                name
            }
        },
        activities {
            id,
            description,
            persons {
                id,
                name
            }
        }
    }
}`;

export default function Persons(): ReactElement {
    const router = useRouter()
    const {id} = router.query
    const {data} = useQuery(personQuery, {variables: {id: Number(id)}});
    return (
        <div>
            {data && (
                <div className="flex gap-x-5 w-full">
                    <div className="grow w-1/4 bg-white shadow-md rounded-lg">
                        <table className="table-fixed w-full">
                            <tbody>
                            <tr>
                                <th>
                                    <th className="w-30 text-xs text-cyan-400 bg-cyan-50 text-left p-2">ID</th>
                                    <td className="p-2 font-medium text-gray-800">{data.person.id}</td>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <th className="w-30 text-xs text-cyan-400 bg-cyan-50 text-left p-2">名前</th>
                                    <td className="p-2 font-medium text-gray-800">{data.person.name}</td>
                                </th>
                            </tr>
                            <tr>
                                <th>
                                    <th className="w-30 text-xs text-cyan-400 bg-cyan-50 text-left p-2">説明</th>
                                    <td className="p-2 font-medium text-gray-800">{data.person.description}</td>
                                </th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/3 bg-white shadow-md rounded-lg p-5">
                        <div className="font-medium self-center text-gold-800">
                            関連
                        </div>
                        <table className="table-auto w-full mt-3">
                            <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                            <tr>
                                <th className="p-2">ID</th>
                                <th>説明</th>
                                <th>人物</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {data.person.relations.map((personRelation) => (
                                <tr key={personRelation.id}>
                                    <td className="p-2 font-medium text-gray-800">{personRelation.id}</td>
                                    <td className="p-2 font-medium text-gray-800">{personRelation.description}</td>
                                    <td className="p-2 font-medium text-gray-800 space-x-2">
                                        {personRelation.persons.map((person) => {
                                            return (
                                                <Link key={person.id} href={`/persons/${person.id}`}>
                                                    <a>{person.name}</a>
                                                </Link>
                                            )
                                        })}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/3 bg-white shadow-md rounded-lg p-5">
                        <div className="font-medium self-center text-gold-800">
                            アクティビティ
                        </div>
                        <table className="table-auto w-full mt-3">
                            <thead className="text-xs text-cyan-400 bg-cyan-50 text-left">
                            <tr>
                                <th className="p-2">ID</th>
                                <th>説明</th>
                                <th>人物</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {data.person.activities.map((activity) => (
                                <tr key={activity.id}>
                                    <td className="p-2 font-medium text-gray-800">{activity.id}</td>
                                    <td className="p-2 font-medium text-gray-800">{activity.description}</td>
                                    <td className="p-2 font-medium text-gray-800 space-x-2">
                                        {activity.persons.map((person) => {
                                            return (
                                                <Link key={person.id} href={`/persons/${person.id}`}>
                                                    <a>{person.name}</a>
                                                </Link>
                                            )
                                        })}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}