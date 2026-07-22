function Box({ color = "green", size = 150 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}

export default Box;
