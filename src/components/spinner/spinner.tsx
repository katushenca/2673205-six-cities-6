import './spinner.css';

type SpinnerProps = {
  size: number;
  color: string;
}


export function Spinner({size, color}: SpinnerProps) {
  return(
    <div
      className="spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderTopColor: color
      }}
    />
  );
}
