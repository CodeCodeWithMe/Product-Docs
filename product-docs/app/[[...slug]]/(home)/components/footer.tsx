export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="bg-dashed">
        <div className="container mx-auto flex items-center justify-between p-8 text-muted-foreground">
          <p className="mx-auto block text-center text-sm">
            © {year} <a href="#">CodeCode.Me</a>. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
