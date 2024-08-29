import Card from "../_components/cash";

export default function Transactions(){
    return (
        <div>
            <div>
                <h1 className="font-semibold drop-shadow-[0_3px_3px_rgba(10,10,10,10)] text-amber-800 text-center text-3xl">Transactions Page</h1>
                <a href="/cashier">Home</a>
            </div>
            <div>
                <Card />
            </div>
        </div>
    );
}