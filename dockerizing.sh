echo "start dockerizing!"
echo "."
echo ".."
echo "..."

docker stop $(docker ps -q -a  --filter="name=tiptap-web")
docker rm $(docker ps -q -a --filter="name=tiptap-web")

result=`docker images tiptap-web`
target=`echo $result | cut -d ' ' -f9`
docker rmi $target

docker build -t tiptap-web:v0.1 .
docker run --name=tiptap-web --oom-score-adj=-1000 -d -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 9090:9090 tiptap-web:v0.1

echo "."
echo "."
echo "."
echo "completed tiptap-web dockerizing!"
