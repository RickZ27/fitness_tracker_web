import Header from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <link
                href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500&display=swap"
                rel="stylesheet"
            />
            <Header />
            <main>{children}</main>
        </section>
    );
}