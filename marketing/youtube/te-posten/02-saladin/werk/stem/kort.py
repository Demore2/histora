import wave, subprocess, numpy as np
for i in range(10):
    w=wave.open(f'h{i}.wav'); SR=w.getframerate(); ch=w.getnchannels()
    a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).reshape(-1,ch).mean(1)/32768
    win=int(0.02*SR); n=len(a)//win
    rms=np.sqrt((a[:n*win].reshape(n,win)**2).mean(1)+1e-12)
    stil=20*np.log10(rms)< -38
    keep=[];j=0;cut=0
    while j<n:
        k=j
        while k<n and stil[k]==stil[j]: k+=1
        L=(k-j)*0.02
        if stil[j] and L>0.8 and j>0 and k<n:
            keep += [(j*win, j*win+int(0.3*SR)), (k*win-int(0.3*SR), k*win)]; cut+=L-0.6
        else: keep.append((j*win,k*win))
        j=k
    keep.append((n*win,len(a)))
    out=np.concatenate([a[s:e] for s,e in keep])
    o=wave.open(f'../dylan-kort/h{i}.wav','wb'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR)
    o.writeframes((np.clip(out,-1,1)*32767).astype(np.int16).tobytes()); o.close()
    subprocess.run(['ffmpeg','-v','error','-y','-i',f'../dylan-kort/h{i}.wav','-ar','44100','-b:a','192k',f'../dylan-kort/h{i}.mp3'])
    print(i, round(len(a)/SR,1),'->',round(len(out)/SR,1),'cut',round(cut,1))
