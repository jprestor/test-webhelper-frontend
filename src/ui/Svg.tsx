export function Svg({
  id,
  width,
  height,
  path = '/sprite.svg',
  fill,
  className,
}: {
  id: string;
  width: string | number;
  height: string | number;
  path?: string;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<use href=${path}#${id} />`,
      }}
    />
  );
}
