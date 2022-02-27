    //"start": "ts-node-dev src/index.ts"

skaffold คือตัวที่ไว้ใช้ auto deploy kubenetes เวลาที่มีการแก้ไข
    -> config file skaffold.yaml
    -> run ด้วยคำสั่ง skaffold dev

เวลาใช้กับ kubernetes สามารถสร้าง secret ได้ด้วยคำสั่ง
    -> kubectl create secret generic jwt-secret --from-literal=<ชื่อ secret>=<key>
    -> kubectl create secret generic jwt-secrt --from-literal=JWT_KEY=asdf
ดู key ที่เพิ่งสร้าง 
    -> kubectl get secrets
การเรียกใช้ secret key
    -> ไปดูตัวอย่างใน file auth-depl.yaml ท่อน
        env:
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY
    -> ที่ code node js สามารถเข้าถึงค่า env ได้ผ่านทาง process.env.JWT_KEY


Unit Test
-> npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server
-> ใน docker file เราไม่ต้องการให้ install package ที่เป็น --save-dev ให้ไปแก้บรรทัดที่ install ให้เป็น "npm install --only=prod"
jest
 ปกติเราจะสร้าง folder __test__ ไว้ใน folder ที่เราจะ test แล้ว file จะตั้งชื่อตาม file ที่ต้องการ test ตามด้วย นามสกุล .test.ts

 create npmjs organization เพื่อสร้าง lib ของตัวเอง
 ใช้ user: poowadon.ingeni@gmail.com ชื่อ org poowadticket ดูในบทที่ 249
 สร้างเป็น lib เอาขึ้น npmjs.com
1. ต้องทำเป็น git ถึงจะเอาขึ้น npmjs ได้
 run คำสั่ง 
    git init
    git add .
    git commit -m "initial commit"
    npm publish --access public
    **กรณ๊ run npm publish ไม่ได้ให้ npm login ก่อน
2. เวลามีการ update ขึ้นให้ใช้คำสั่ง
    git add .
    git commit -m <comment>
    npm version patch //คำสั่งนี้จะทำการ auto เพิ่ม version ใน package.json ให้อัติโนมัติ
    npm run build
    npm publish


การเข้าไปสิ่งที่อยู่ใน kubernetes pod
kubectl exec -it <podname> sh

วิธีการ forward port 
kubectl port-forward <pod name> <port ของเครื่อง>:<port ของ pod>

เนื่องจาก pod name จะเปลี่ยนไปเรื่อยหากต้องการดึงค่า pod name ที่ yaml file ให้ใส่ (ดูตัวอย่างใน tickets-depl.yaml)
    valueFrom:
        filedRef:
            fieldPath: metadata.name


ใน mongodb เวลาดึงข้อมูลจะเจอ field __V ซึงเป็นตัวบอก version เราสามารถใช้ lib เพื่อ auto update version ได้
__V ไว้ใช้ระบุ version ประโยชน์เช่นการจัดการ concurrency ใน microservice
//track version record on mongo
ticketSchema.plugin(updateIfCurrentPlugin);


ส่วนจ่ายตังเช้นตัดเงินผ่าน credit ใช้บริการของ https://dashboard.stripe.com/