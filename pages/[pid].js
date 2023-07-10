import fs from "fs/promises";
import path from "path";

const ProductDetail = (props) => {
  const { product } = props;

  return (
    <>
      <div>{product.name}</div>
    </>
  );
};

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((p) => p.id == productId);
  return {
    props: {
      product,
    },
  };
}

// tell Nextjs for which dynamic values this page be pre-rendered
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }, { params: { pid: "p2" } }],
    /**
     * if true, then it means that Nextjs will not pre-render the dynamic page that are not in "paths".
     * however, those such pages would be rendered dynamically. eg: p3 page
     */
    fallback: false, // if true, then dont need to specify all params to pre-render.
  };
}

export default ProductDetail;
