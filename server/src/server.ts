import app from "./app";
import { env } from "./utils/validateEnv";

const port = env.PORT;
app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});
