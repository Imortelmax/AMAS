export default function HistoryPage() {
    return (
        <main className="min-h-screen pt-22 pb-20 px-4">
            <div className="max-w-4xl mx-auto text-center bg-zinc-100 p-6 border-2 rounded-2xl">
                <h1 className="text-4xl text-center font-bold mb-2">L'histoire de notre association</h1>
                <p className="p-6 ">
                    L'Association Moto Ancienne Salernoise (AMAS) a été fondée en 1998 par un groupe 
                    de passionnés de motos anciennes à Salernes, une charmante commune du Var, 
                    au sein du <a href="https://model-club-salernois.wixsite.com/m-c-s" target="_blank">Model Club Salernois</a>.
                    L'objectif de l'association étant de réunir les personnes de la région Salernoise souhaitant réparer, entretenir, 
                    restaurer leur patrimoine motocycliste d'avant 1985, motos de collection de plus de 30 ans ou 
                    ayant un intérêt spécifique pour les véhicules anciens; participer à des ballades, salons, 
                    expos diverses et toutes autres activités ayant un rapport avec la moto ou les sports mécaniques; 
                    participer ou organiser des sorties sportives, des démonstrations d'anciennes, des rallyes routiers; 
                    ou encore d'aider lors d'interventions légères ou de réglages. 
                    En 2001, l'AMAS est devenue une association indépendante, se consacrant entièrement à la promotion 
                    et à la préservation du patrimoine motocycliste de la région en organisant des événements, des sorties 
                    et des expositions pour les amateurs de motos classiques. Notre association est devenue un lieu de rencontre 
                    pour les passionnés de tous âges, offrant un espace convivial pour partager notre amour commun pour les 
                    motos anciennes et leur histoire riche.
                </p>
                <h5 className="text-2xl font-bold mt-8 mb-4">Historique de nos présidents :</h5>
                <ul className="text-xl">
                    <li>2001 - 2008: Giger Jean Louis</li>
                    <li>2008 - 2009: Philipe Fournier</li>
                    <li>2010 - 2014: Giger Jean Louis</li>
                    <li>2014 - 2014: Leborgne Remy pendant 6 mois</li>
                    <li>2014 - 2019: Giger Jean Louis</li>
                    <li>2019 - 2023: Leborgne Remy</li>
                    <li>2023 - Présent: Guibergia Adrien</li>
                </ul>
            </div>
        </main>
    );
}