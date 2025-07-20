let voices = JSON.parse(localStorage.getItem('elevenlabs_voices') || '[]');
let selectedVoiceId = localStorage.getItem('selected_voice') || null;
let currentAudioUrl = null;
let speechHistory = JSON.parse(localStorage.getItem('speech_history') || '[]');

// Update the presetAudioFiles mapping with the newly added files
const presetAudioFiles = {
    "pNInz6obpgDQGcFmaJgB": "044_Hey__I_m_Adam_Adam__pNInz6obpgDQGcFmaJgB_.mp3",
    "Xb7hH8MSUJpSbSDYk0k2": "043_Hey__I_m_Alice_Alice__Xb7hH8MSUJpSbSDYk0k2_.mp3",
    "ErXwobaYiN019PkySvjV": "042_Hey__I_m_Antoni_Antoni__ErXwobaYiN019PkySvjV_.mp3",
    "VR6AewLTigWG4xSOukaG": "041_Hey__I_m_Arnold_Arnold__VR6AewLTigWG4xSOukaG_.mp3",
    "nPczCjzI2devNBz1zQrb": "040_Hey__I_m_Brian_Brian__nPczCjzI2devNBz1zQrb_.mp3",
    "N2lVS1w4EtoT3dr4eOWO": "039_Hey__I_m_Callum_Callum__N2lVS1w4EtoT3dr4eOWO_.mp3",
    "IKne3meq5aSn9XLyUdCD": "038_Hey__I_m_Charlie_Charlie__IKne3meq5aSn9XLyUdCD_.mp3",
    "XB0fDUnXU5powFXDhCwa": "037_Hey__I_m_Charlotte_Charlotte__XB0fDUnXU5powFXDhCwa_.mp3",
    "iP95p4xoKVk53GoZ742B": "036_Hey__I_m_Chris_Chris__iP95p4xoKVk53GoZ742B_.mp3",
    "2EiwWnXFnvU5JabPnv8n": "035_Hey__I_m_Clyde_Clyde__2EiwWnXFnvU5JabPnv8n_.mp3",
    "onwK4e9ZLuTAKqWW03F9": "034_Hey__I_m_Daniel_Daniel__onwK4e9ZLuTAKqWW03F9_.mp3",
    "CYw3kZ02Hs0563khs1Fj": "033_Hey__I_m_Dave_Dave__CYw3kZ02Hs0563khs1Fj_.mp3",
    "AZnzlk1XvdvUeBnXmlld": "032_Hey__I_m_Domi_Domi__AZnzlk1XvdvUeBnXmlld_.mp3",
    "ThT5KcBeYPX3keUQqHPh": "031_Hey__I_m_Dorothy_Dorothy__ThT5KcBeYPX3keUQqHPh_.mp3",
    "29vD33N1CtxCmqQRPOHJ": "030_Hey__I_m_Drew_Drew__29vD33N1CtxCmqQRPOHJ_.mp3",
    "LcfcDJNUP1GQjkzn1xUU": "029_Hey__I_m_Emily_Emily__LcfcDJNUP1GQjkzn1xUU_.mp3",
    "g5CIjZEefAph4nQFvHAz": "028_Hey__I_m_Ethan_Ethan__g5CIjZEefAph4nQFvHAz_.mp3",
    "jsCqWAovK2LkecY7zXl4": "026_Hey__I_m_Freya_Freya__jsCqWAovK2LkecY7zXl4_.mp3",
    "D38z5RcWu1voky8WS1ja": "027_Hey__I_m_Fin_Fin__D38z5RcWu1voky8WS1ja_.mp3",
    "JBFqnCBsd6RMkjVDRZzb": "025_Hey__I_m_George_George__JBFqnCBsd6RMkjVDRZzb_.mp3",
    "zcAOhNBS3c14rBihAFp1": "023_Hey__I_m_Giovanni_Giovanni__zcAOhNBS3c14rBihAFp1_.mp3",
    "jBpfuIE2acCO8z3wKNLl": "024_Hey__I_m_Gigi_Gigi__jBpfuIE2acCO8z3wKNLl_.mp3",
    "z9fAnlkpzviPz146aGWa": "022_Hey__I_m_Glinda_Glinda__z9fAnlkpzviPz146aGWa_.mp3",
    "oWAxZDx7w5VEj9dCyTzz": "021_Hey__I_m_Grace_Grace__oWAxZDx7w5VEj9dCyTzz_.mp3",
    "SOYHLrjzK2X1ezoPC6cr": "020_Hey__I_m_Harry_Harry__SOYHLrjzK2X1ezoPC6cr_.mp3",
    "bVMeCyTHy58xNoL34h3p": "018_Hey__I_m_Jeremy_Jeremy__bVMeCyTHy58xNoL34h3p_.mp3",
    "Zlb1dXrM653N07WRdFW3": "016_Hey__I_m_Joseph_Joseph__Zlb1dXrM653N07WRdFW3_.mp3",
    "t0jbNlBVZ17f02VDIeMI": "017_Hey__I_m_Jessie_Jessie__t0jbNlBVZ17f02VDIeMI_.mp3",
    "ZQe5CZNOzWyzPSCn5a3c": "019_Hey__I_m_James_James__ZQe5CZNOzWyzPSCn5a3c_.mp3",
    "TxGEqnHWrfWFTfGW9XjX": "015_Hey__I_m_Josh_Josh__TxGEqnHWrfWFTfGW9XjX_.mp3",
    "pFZP5JQG7iQjIQuC4Bku": "013_Hey__I_m_Lily_Lily__pFZP5JQG7iQjIQuC4Bku_.mp3",
    "TX3LPaxmHKxFdv7VOQHJ": "014_Hey__I_m_Liam_Liam__TX3LPaxmHKxFdv7VOQHJ_.mp3",
    "XrExE9yKIg1WjnnlVkGX": "012_Hey__I_m_Matilda_Matilda__XrExE9yKIg1WjnnlVkGX_.mp3",
    "flq6f7yk4E4fJM5XTYuZ": "011_Hey__I_m_Michael_Michael__flq6f7yk4E4fJM5XTYuZ_.mp3",
    "zrHiDhphv9ZnVXBqCLjz": "010_Hey__I_m_Mimi_Mimi__zrHiDhphv9ZnVXBqCLjz_.mp3",
    "piTKgcLEGmPE4e6mEKli": "009_Hey__I_m_Nicole_Nicole__piTKgcLEGmPE4e6mEKli_.mp3",
    "ODq5zmih8GrVes37Dizd": "008_Hey__I_m_Patrick_Patrick__ODq5zmih8GrVes37Dizd_.mp3",
    "5Q0t7uMcjvnagumLfvZi": "007_Hey__I_m_Paul_Paul__5Q0t7uMcjvnagumLfvZi_.mp3",
    "21m00Tcm4TlvDq8ikWAM": "006_Hey__I_m_Rachel_Rachel__21m00Tcm4TlvDq8ikWAM_.mp3",
    "yoZ06aMxZJJ28mfd3POQ": "005_Hey__I_m_Sam_Sam__yoZ06aMxZJJ28mfd3POQ_.mp3",
    "EXAVITQu4vr4xnSDxMaL": "004_Hey__I_m_Sarah_Sarah__EXAVITQu4vr4xnSDxMaL_.mp3",
    "pMsXgVXv3BLzUgSXRplE": "003_Hey__I_m_Serena_Serena__pMsXgVXv3BLzUgSXRplE_.mp3",
    "GBv7mTt0atIp3Br8iCZE": "002_Hey__I_m_Thomas_Thomas__GBv7mTt0atIp3Br8iCZE_.mp3",
    "knrPHWnBmmDHMoiMeP3l": "001_Hey__I_m_Santa_Claus_Santa_Claus__knrPHWnBmmDHMoiMeP3l_.mp3"
};

// Remove multilingual and model voices from preset voices
const excludedVoices = [
    "eleven_multilingual_v2",
    "eleven_flash_v2_5", 
    "eleven_flash_v2",
    "eleven_turbo_v2_5",
    "eleven_turbo_v2"
];

// Filter out excluded voices from preset buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        if (excludedVoices.includes(btn.dataset.voice)) {
            btn.style.display = 'none';
        }
    });
});

// DOM elements
const voiceIdInput = document.getElementById('voiceIdInput');
const addVoiceBtn = document.getElementById('addVoiceBtn');
const voiceList = document.getElementById('voiceList');
const textInput = document.getElementById('textInput');
const speakBtn = document.getElementById('speakBtn');
const stopBtn = document.getElementById('stopBtn');
const audioPlayer = document.getElementById('audioPlayer');
const historyList = document.getElementById('historyList');

// Initialize
renderVoiceList();
renderHistory();
updateButtonStates();

// Event listeners
addVoiceBtn.addEventListener('click', addVoice);
voiceIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addVoice();
});

speakBtn.addEventListener('click', speakText);
stopBtn.addEventListener('click', stopAudio);

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const voiceId = btn.dataset.voice;
        const name = btn.textContent;
        
        // Check if audio file exists
        const audioFile = presetAudioFiles[voiceId];
        if (audioFile && audioFile !== 'missing') {
            // Enable button
            btn.disabled = false;
            btn.style.opacity = '1';
            
            // Add voice and select it
            addVoiceFromPreset(voiceId, name);
            
            // Auto-play the audio snippet
            const audio = new Audio(audioFile);
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Set default text
            textInput.value = `Hey, I'm ${name}`;
            updateButtonStates();
        } else {
            // Grey out and disable button
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.title = 'Audio file not available';
        }
    });
});

function addVoice() {
    const voiceId = voiceIdInput.value.trim();
    if (!voiceId) return;

    if (voices.some(v => v.id === voiceId)) {
        alert('Voice ID already exists!');
        return;
    }

    voices.push({ id: voiceId, name: voiceId });
    voiceIdInput.value = '';
    saveVoices();
    renderVoiceList();
}

function addVoiceFromPreset(voiceId, name) {
    if (voices.some(v => v.id === voiceId)) {
        selectVoice(voiceId);
        return;
    }

    voices.push({ id: voiceId, name: `${name} (${voiceId})` });
    saveVoices();
    renderVoiceList();
    selectVoice(voiceId);
}

function selectVoice(voiceId) {
    selectedVoiceId = voiceId;
    localStorage.setItem('selected_voice', voiceId);
    renderVoiceList();
    updateButtonStates();
}

function deleteVoice(voiceId) {
    voices = voices.filter(v => v.id !== voiceId);
    if (selectedVoiceId === voiceId) {
        selectedVoiceId = null;
    }
    saveVoices();
    renderVoiceList();
    updateButtonStates();
}

function renderVoiceList() {
    voiceList.innerHTML = '';
    
    voices.forEach(voice => {
        const item = document.createElement('div');
        item.className = `voice-item ${voice.id === selectedVoiceId ? 'selected' : ''}`;
        
        item.innerHTML = `
            <div class="voice-info">
                <div class="voice-id">${voice.name}</div>
            </div>
            <div class="voice-actions">
                <button onclick="selectVoice('${voice.id}')">Select</button>
                <button class="delete-btn" onclick="deleteVoice('${voice.id}')">Delete</button>
            </div>
        `;
        
        voiceList.appendChild(item);
    });
}

async function speakText() {
    if (!selectedVoiceId || !textInput.value.trim()) return;

    speakBtn.disabled = true;
    speakBtn.textContent = 'Generating...';

    try {
        const result = await websim.textToSpeech({
            text: textInput.value,
            voice: selectedVoiceId,
        });

        // Clean up previous audio
        if (currentAudioUrl) {
            URL.revokeObjectURL(currentAudioUrl);
        }

        // Create audio element and play
        audioPlayer.src = result.url;
        audioPlayer.style.display = 'block';
        await audioPlayer.play();
        
        currentAudioUrl = result.url;

        // Add to history
        const historyItem = {
            id: Date.now(),
            text: textInput.value,
            voiceId: selectedVoiceId,
            voiceName: voices.find(v => v.id === selectedVoiceId)?.name || selectedVoiceId,
            audioUrl: result.url,
            timestamp: new Date().toISOString()
        };
        
        speechHistory.unshift(historyItem);
        if (speechHistory.length > 50) { // Keep only last 50 items
            speechHistory = speechHistory.slice(0, 50);
        }
        
        localStorage.setItem('speech_history', JSON.stringify(speechHistory));
        renderHistory();
        
    } catch (error) {
        console.error('Error generating speech:', error);
        alert('Error generating speech. Please check the voice ID and try again.');
    } finally {
        speakBtn.disabled = false;
        speakBtn.textContent = 'Speak';
    }
}

function stopAudio() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}

function updateButtonStates() {
    speakBtn.disabled = !selectedVoiceId || !textInput.value.trim();
    stopBtn.disabled = !audioPlayer.src;
}

function saveVoices() {
    localStorage.setItem('elevenlabs_voices', JSON.stringify(voices));
}

// Text input listener
textInput.addEventListener('input', updateButtonStates);

function renderHistory() {
    historyList.innerHTML = '';
    
    if (speechHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-history">No generated speech yet</div>';
        return;
    }
    
    speechHistory.forEach(item => {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.innerHTML = `
            <div class="history-text">${item.text}</div>
            <div class="history-voice">Voice: ${item.voiceName}</div>
            <div class="history-actions">
                <button class="play-history-btn" onclick="playHistory('${item.id}')">Play</button>
                <button class="download-history-btn" onclick="downloadHistory('${item.id}')">Download</button>
                <button class="delete-history-btn" onclick="deleteHistory('${item.id}')">Delete</button>
            </div>
        `;
        historyList.appendChild(historyDiv);
    });
    
    // Add bulk download button if there are items
    if (speechHistory.length > 0) {
        const bulkDownloadDiv = document.createElement('div');
        bulkDownloadDiv.style.marginTop = '20px';
        bulkDownloadDiv.innerHTML = `
            <button class="download-all-btn" onclick="downloadAllHistory()">
                Download All (${speechHistory.length} items)
            </button>
        `;
        historyList.appendChild(bulkDownloadDiv);
    }
}

function playHistory(itemId) {
    const item = speechHistory.find(h => h.id === Number(itemId));
    if (item) {
        audioPlayer.src = item.audioUrl;
        audioPlayer.style.display = 'block';
        audioPlayer.play().catch(e => {
            console.error('Error playing history audio:', e);
            alert('Error playing audio. The file may have expired.');
        });
    }
}

function deleteHistory(itemId) {
    const itemIndex = speechHistory.findIndex(h => h.id === Number(itemId));
    if (itemIndex === -1) return;
    
    const item = speechHistory[itemIndex];
    if (item && item.audioUrl) {
        URL.revokeObjectURL(item.audioUrl);
    }
    
    speechHistory.splice(itemIndex, 1);
    localStorage.setItem('speech_history', JSON.stringify(speechHistory));
    renderHistory();
}

async function downloadHistory(itemId) {
    const item = speechHistory.find(h => h.id === Number(itemId));
    if (!item || !item.audioUrl) return;
    
    try {
        // Create download link
        const link = document.createElement('a');
        link.href = item.audioUrl;
        
        // Get filename from text and voice name
        const cleanText = item.text.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
        const cleanVoice = item.voiceName.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `${cleanText}_${cleanVoice}.mp3`;
        
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.error('Error downloading history file:', error);
        alert('Error downloading file. Please try again.');
    }
}

async function downloadAllHistory() {
    if (speechHistory.length === 0) return;
    
    try {
        const zip = new JSZip();
        
        // Create single download.sh for Unix/Linux/macOS
        let shScript = `#!/bin/bash
# ElevenLabs Speech Downloader
# Generated: ${new Date().toLocaleString()}
echo "Downloading ${speechHistory.length} speech files..."\n\n`;
        
        // Create single download.bat for Windows
        let batScript = `@echo off
echo ElevenLabs Speech Downloader
echo Generated: ${new Date().toLocaleString()}
echo Downloading ${speechHistory.length} speech files...\n\n`;
        
        // Process each item
        for (let i = 0; i < speechHistory.length; i++) {
            const item = speechHistory[i];
            
            const cleanText = item.text.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
            const filename = `${String(i + 1).padStart(3, '0')}_${cleanText}_${item.voiceName.replace(/[^a-zA-Z0-9]/g, '_')}`;
            
            // Add to shell script
            shScript += `echo "Downloading speech ${i + 1}/${speechHistory.length}..."\n`;
            shScript += `curl -L -o "${filename}.mp3" "${item.audioUrl}"\n`;
            
            // Add to batch script
            batScript += `echo Downloading speech ${i + 1}/${speechHistory.length}...\n`;
            batScript += `powershell -Command "Invoke-WebRequest -Uri '${item.audioUrl}' -OutFile '${filename}.mp3'"\n\n`;
            
            // Add text content
            const content = `Text: ${item.text}\nVoice: ${item.voiceName}\nVoice ID: ${item.voiceId}\nDate: ${new Date(item.timestamp).toLocaleString()}\nAudio URL: ${item.audioUrl}`;
            zip.file(`${filename}.txt`, content);
            
            // Add metadata JSON
            const metadata = {
                text: item.text,
                voiceId: item.voiceId,
                voiceName: item.voiceName,
                timestamp: item.timestamp,
                audioUrl: item.audioUrl
            };
            zip.file(`${filename}.json`, JSON.stringify(metadata, null, 2));
        }
        
        // Add completion messages
        shScript += `\necho "All downloads completed!"`
        batScript += `\necho All downloads completed!\npause`;
        
        // Add scripts to zip
        zip.file('download.sh', shScript);
        zip.file('download.bat', batScript);
        
        // Create index file
        let index = `ElevenLabs Speech History Index\nGenerated: ${new Date().toLocaleString()}\nTotal: ${speechHistory.length}\n\n`;
        speechHistory.forEach((item, i) => {
            const cleanText = item.text.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
            const filename = `${String(i + 1).padStart(3, '0')}_${cleanText}_${item.voiceName.replace(/[^a-zA-Z0-9]/g, '_')}`;
            index += `${i + 1}. ${item.text.substring(0, 50)}${item.text.length > 50 ? '...' : ''}\n   Voice: ${item.voiceName}\n   Files: ${filename}.txt, ${filename}.json\n\n`;
        });
        zip.file('INDEX.txt', index);
        
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipBlob);
        
        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = `elevenlabs_speech_${new Date().getTime()}.zip`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
        
    } catch (error) {
        console.error('Error creating zip:', error);
        alert('Error creating archive. Check console for details.');
    }
}

// Fix for JSZip module issue
let JSZip = window.JSZip || window.JSZip?.default || window.JSZip?.JSZip;

// Make functions global for onclick handlers
window.selectVoice = selectVoice;
window.deleteVoice = deleteVoice;
window.playHistory = playHistory;
window.deleteHistory = deleteHistory;
window.downloadHistory = downloadHistory;
window.downloadAllHistory = downloadAllHistory;