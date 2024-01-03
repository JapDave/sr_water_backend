const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const multer = require("multer");
const sharp = require("sharp");
const app = express();
const fs = require("fs");
const path=require("path")
const { categoryRouter } = require("./routes/category.routes");
const { productRouter } = require("./routes/product.routes");
const { cardRouter } = require("./routes/card.routes");
const { blogRouter } = require("./routes/blog.routes");
const { homeRouter } = require("./routes/home.routes");
const { aboutRouter } = require("./routes/about.routes");
const { newsRouter } = require("./routes/news.routes");
const { broucherRouter } = require("./routes/broucher.routes");
const { inquiryRouter } = require("./routes/inquiry.routes");
const { annualRouter } = require("./routes/annualScheme.routes");
const { outletRouter } = require("./routes/outlet.routes");
const { navbarRouter } = require("./routes/navbar.routes");
const { viewRouter } = require("./routes/view.routes");
app.use(express.json());
require("dotenv").config();
app.use(cors({ origin: true }));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only PNG images are allowed"), false);
  }
};
const fileFilter2=(req,file,cb)=>{
   if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only PNG images are allowed"), false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 },
});
const upload1 = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/product");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    fileFilter,
    limits: { fileSize: 500 * 1024 },
  }),
});
const upload2 = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/blog");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    fileFilter,
    limits: { fileSize: 500 * 1024 },
  }),
});
const upload3 = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/home");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    fileFilter,
    limits: { fileSize: 500 * 1024 },
  }),
});
const upload4 = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/news");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    fileFilter,
    limits: { fileSize: 2 * 1000 * 1024 },
  }),
});
const upload5=multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/broucher");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
})

app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);
app.use("/", cardRouter);
app.use("/", blogRouter);
app.use("/", homeRouter);
app.use("/", aboutRouter);
app.use("/", newsRouter);
app.use("/",broucherRouter)
app.use("/",inquiryRouter)
app.use("/",annualRouter)
app.use("/",outletRouter)
app.use("/",navbarRouter)
app.use("/",viewRouter)

app.get('/downloadContact', (req, res) => {
  let {name,number}=req.query

  // Create vCard content
  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${number}\nEND:VCARD`;

  // Set appropriate headers for vCard download
  res.header('Content-type', 'text/plain');
   res.header('Content-Disposition', 'attachment; filename="contact.vcf"');

  // Output vCard content
  res.send(vcard);
});

app.post("/broucher/pdf",upload5.single("broucher"),async(req,res)=>{
  console.log(req.file);
      try {
        res.send({
          msg: "Image Uploaded",
          data: req.file.filename,
          success: res.statusCode,
        })
      } catch (error) {
        res.send({
          msg: err.message,
          error: err,
        });
      }
}) //pdf 
app.post("/news/image", upload4.single("events"), async (req, res) => {
  
  console.log(req.file);
  sharp(req.file.path)
    .metadata()
    .then((metadata) => {
      let width = metadata.width;
      let height = metadata.height;
      if (width == 300 && height == 180) {
        console.log(req.file);
        console.log(width);
        res.send({
          msg: "Image Uploaded",
          data: req.file.filename,
          success: res.statusCode,
        });
      } else {
        res.send({msg:"Image dimensions must be 750x500 pixels."});
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({
        msg: err.message,
        error: err,
      });
    });
});// 300*180
app.post("/home/image", upload3.single("home"), async (req, res) => {
  sharp(req.file.path)
    .metadata()
    .then((metadata) => {
      let width = metadata.width;
      let height = metadata.height;
      if (width == 500 && height == 500) {
        console.log(req.file);
        console.log(width);
        res.send({
          msg: "Image Uploaded",
          data: req.file.filename,
          success: res.statusCode,
        });
      } else {
        res.send("Image dimensions must be 500x500 pixels.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({
        msg: err.message,
        error: err,
      });
    });
}); //500*500
app.post("/blog/image", upload2.single("blog"), async (req, res) => {
  sharp(req.file.path)
    .metadata()
    .then((metadata) => {
      let width = metadata.width;
      let height = metadata.height;
      if (width == 350 && height == 220) {
        console.log(req.file);
        console.log(width);
        res.send({
          msg: "Image Uploaded",
          data: req.file.filename,
          success: res.statusCode,
        });
      } else {
        res.send("Image dimensions must be 500x500 pixels.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({
        msg: err.message,
        error: err,
      });
    });
}); //350*220
app.post("/product/image", upload1.array("product"), async (req, res) => {

  try {
    let arr=[]
    console.log(req.files); // empty array
    for(let file of req.files) {
      let metadata=await sharp(file.path).metadata()
      let width = metadata.width;
      console.log(width);
      let height = metadata.height;
      console.log(height);
      if(width==500 && height==500){
        arr.push(file.filename)
      }
      console.log(arr,"arr");
  }
  res.send({
    msg:"Images Uploaded",
    data:arr,
    status:res.statusCode
  })

  } catch (error) {
    res.send({
            msg: error.message,
             error: error,
         });
  }

 
  // sharp(file.path)
  //   .metadata()
  //   .then((metadata) => {
  //     let width = metadata.width;
  //     let height = metadata.height;
  //     if (width==500 && height==500 ) {
        

  //       console.log(width);
  //       res.send({
  //         msg: "Image Uploaded",
  //         data: req.file.filename,
  //         success: res.statusCode,
  //       });
  //     } else {
  //       res.send("Image dimensions must be 500x500 pixels.");
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.send({
  //       msg: err.message,
  //       error: err,
  //     });
  //   });
}); //500*500
app.post("/user/profile/new", upload.single("profile"), async (req, res) => {
  sharp(req.file.path)
    .metadata()
    .then((metadata) => {
      let width = metadata.width;
      let height = metadata.height;
      if (width == 200 && height == 200) {
        console.log(req.file);
        console.log(width);
        res.send({
          msg: "Image Uploaded",
          data: req.file.filename,
          success: res.statusCode,
        });
      } else {
        res.send("Image dimensions must be 500x500 pixels.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({
        msg: err.message,
        error: err,
      });
    });
}); //200*200
app.post("/user/profile/image", upload.single("avatar"), async (req, res) => {
  sharp(req.file.path)
    .metadata()
    .then((metadata) => {
      let width = metadata.width;
      let height = metadata.height;
      if (width == 200 && height == 200) {
        console.log(req.file);
        console.log(width);
        res.send({
          msg: "Image Uploaded",
          data: req.file.filename,
          success: res.statusCode,
        });
      } else {
        res.send({ msg: "Image dimensions must be 200x200 pixels." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({
        msg: err.message,
        error: err,
      });
    });
}); //200*200
app.listen(process.env.PORT, async () => {
  console.log("server is running on port " + process.env.PORT);
  try {
    await connection;
    console.log("Database connection established");
  } catch (error) {
    console.log(error);
  }
});
