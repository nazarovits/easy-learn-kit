export const metadata = {
  title: "Angol",
  description: "Angol nyelv tanulása",
};

const EnglishPage = () => {
  const links: { href: string; label: string }[] = [
    { href: "/class-room/4/english/type-color", label: "Színek" },
    { href: "/class-room/4/english/numbers-1-10", label: "Számok" },
  ];

  return (
    <div>
      <h1>Angol</h1>
      <p>Üdvözöljük az angol nyelv tanulása oldalon!</p>
      <hr />
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnglishPage;
